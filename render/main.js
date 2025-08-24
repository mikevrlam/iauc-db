function drawLine(ra1, dec1, ra2, dec2, svg) {
  const width = svg.clientWidth;
  const height = svg.clientHeight;

  const x1 = (ra1 / 24) * width;
  const y1 = height - ((dec1 + 90) / 180) * height;
  const x2 = (ra2 / 24) * width;
  const y2 = height - ((dec2 + 90) / 180) * height;

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "blue");
  line.setAttribute("stroke-width", "1");
  svg.appendChild(line);
}

async function loadAndDrawStars() {
  try {
    const [starsResp, linesResp] = await Promise.all([fetch("/stars"), fetch("/lines")]);
    const starsData = await starsResp.json();
    const linesData = await linesResp.json();

    const svg = document.getElementById("star-map");
    if (!svg) return;

    const width = svg.clientWidth;
    const height = svg.clientHeight;

    // Precompute star positions per constellation
    const starPositions = {};
    Object.entries(starsData).forEach(([constAbbr, stars]) => {
      starPositions[constAbbr] = {};
      stars.forEach((star) => {
        const [, , latin, ra, dec] = star;
        const x = (ra / 24) * width;
        const y = height - ((dec + 90) / 180) * height;
        starPositions[constAbbr][latin] = { x, y, ra, dec };
      });
    });

    // Draw stars
    Object.entries(starsData).forEach(([constAbbr, stars]) => {
      stars.forEach((star) => {
        const [, , latin, , , , type] = star;
        const { x, y } = starPositions[constAbbr][latin];

        const radius = type === 1 ? 4 : type === 2 ? 3 : 2;

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", radius);
        circle.setAttribute("fill", "black");
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", "0.5");
        circle.setAttribute("title", latin);

        svg.appendChild(circle);
      });
    });

    // Draw lines per constellation
    Object.entries(linesData).forEach(([constAbbr, lines]) => {
      lines.forEach(([from, to]) => {
        const start = starPositions[constAbbr][from];
        const end = starPositions[constAbbr][to];
        if (!start || !end) return;

        const currentRelativeDirection = start.ra < end.ra ? "E" : "W";

        const withinDistance =
          currentRelativeDirection === "E" ? end.ra - start.ra : start.ra - end.ra;
        const cutOffDistance = 24 - withinDistance;

        console.log({
          et: [from, to],
          d: { w: withinDistance, c: cutOffDistance },
        });

        if (withinDistance < cutOffDistance) {
          drawLine(start.ra, start.dec, end.ra, end.dec, svg);
        } else {
          if (currentRelativeDirection === "E") {
            // wrapping west
            let decAt0 = start.dec + ((end.dec - start.dec) * (start.ra - 0)) / cutOffDistance;
            drawLine(start.ra, start.dec, 0, decAt0, svg);
            drawLine(24, decAt0, end.ra, end.dec, svg);
          } else {
            // wrapping east
            let decAt24 = start.dec + ((end.dec - start.dec) * (24 - start.ra)) / cutOffDistance;
            drawLine(start.ra, start.dec, 24, decAt24, svg);
            drawLine(0, decAt24, end.ra, end.dec, svg);
          }
        }

        // console.log(end.ra, start.ra);
        // let raDiff = end.ra - start.ra;
        // console.log(raDiff);
        // let eastDistance = (raDiff + 24) % 24;
        // let westDistance = (start.ra - end.ra + 24) % 24;
        // console.log(eastDistance, westDistance);

        // const svg = document.getElementById("star-map");
        // if (!svg) return;

        // if (eastDistance < 12 && westDistance < 12) {
        //   // within map
        //   drawLine(start.ra, start.dec, end.ra, end.dec, svg);
        // } else if (eastDistance > 12) {
        //   // wrap east
        //   let decAt24 = start.dec + ((end.dec - start.dec) * (24 - start.ra)) / raDiff;
        //   drawLine(start.ra, start.dec, 24, decAt24, svg);
        //   drawLine(0, decAt24, end.ra, end.dec, svg);
        // } else if (westDistance > 12) {
        //   // wrap west
        //   let decAt0 = start.dec + ((end.dec - start.dec) * (0 - start.ra)) / raDiff;
        //   drawLine(start.ra, start.dec, 0, decAt0, svg);
        //   drawLine(24, decAt0, end.ra, end.dec, svg);
        // }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

loadAndDrawStars();
