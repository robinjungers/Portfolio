export type ProjectImageInfo = {
  largeUrl : string;
  largeWidth : number;
  largeHeight : number;
  smallUrl : string;
  smallWidth : number;
  smallHeight : number;
  alt : string;
  color1 : string;
  color2 : string;
}

export type ProjectLink = {
  url : string;
  title : string;
}

export type Project = {
  slug : string;
  title : string;
  headline : string;
  images : ProjectImageInfo[];
  text : string;
  roles : string[];
  links : ProjectLink[];
}