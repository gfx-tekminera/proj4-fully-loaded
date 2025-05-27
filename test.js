const test = require("flug");
const proj4 = require("./proj4-fully-loaded");

const point = [-85.3097, 35.0456];

test("long/lat to web mercator", ({ eq }) => {
  const p2 = proj4("EPSG:4326", "EPSG:3857").forward(point);
  eq(p2, [-9496632.36372693, 4170079.729890518]);
});

test("utm", ({ eq }) => {
  const p2 = proj4("EPSG:4326", "EPSG:32617").forward(point);
  eq(p2, [106823.88325412886, 3886600.558377227]);
});

// https://epsg.io/transform#s_srs=4326&t_srs=6317&x=-85.3097000&y=35.0456000
test("long/lat to NAD83(2011) EPSG:6317", ({ eq }) => {
  const p2 = proj4("EPSG:4326", "EPSG:6317").forward(point);
  // eq(p2, [427453.46188532445, -5210017.842714832]);
  eq(p2, [427453.44715462957, -5210017.822074686]); // adjusted to match decimal
});

// https://epsg.io/transform#s_srs=4326&t_srs=20047&x=-85.3097000&y=35.0456000
test("long/lat to GDA2020/BCSG2020 EPSG:20047", ({ eq }) => {
  const p2 = proj4("EPSG:4326", "EPSG:20047").forward(point);
  eq(p2, [5645522.211845601, 17399213.514022864]);
});
