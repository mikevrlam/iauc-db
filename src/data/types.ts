export type Constellation = {
  name: string;
  abbr: {
    iau: string;
    nasa: string;
  };
};

export type Line = [string, string];

export type RawStar = [string, string, string, string, string];

export type Star = [string, string, string, number, number, string, number];
