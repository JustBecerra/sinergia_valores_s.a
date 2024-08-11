/* empty css                          */
import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, F as FailedToFetchRemoteImageDimensions, e as createAstro, f as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, u as unescapeHTML, i as renderComponent, j as Fragment, k as renderScript, l as renderSlot, n as renderHead } from '../astro_DWw_swtm.mjs';
import 'kleur/colors';
import { r as resolveSrc, i as isRemoteImage, a as isESMImportedImage, b as isLocalService, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_Y94IQdGm.mjs';
import 'clsx';
import * as mime from 'mrmime';
import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
/* empty css                                    */

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4) return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize) return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box) break;
    if (box.name === boxName) return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1) return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  mif1: "heif",
  msf1: "heif",
  // hief-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength) return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1) return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = toUTF8String(input).match(extractorRegExps.root);
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.indexOf(type) > -1) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function probe(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new Error("Failed to fetch image");
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done) break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = lookup(accumulatedChunks);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch (error) {
      }
    }
  }
  throw new Error("Failed to parse the size");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_Y94IQdGm.mjs'
    ).then(n => n.h).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset) globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src)) {
    try {
      const result = await probe(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      delete resolvedOptions.inferSize;
    } catch {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(resolvedOptions.src)
      });
    }
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$9 = createAstro("https://sinergia&valores");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/astro/components/Image.astro", void 0);

const $$Astro$8 = createAstro("https://sinergia&valores");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
  if (scopedStyleClass) {
    if (pictureAttributes.class) {
      pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
    } else {
      pictureAttributes.class = scopedStyleClass;
    }
  }
  for (const key in props) {
    if (key.startsWith("data-astro-cid")) {
      pictureAttributes[key] = props[key];
    }
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute(mime.lookup(image.options.format ?? image.src) ?? `image/${image.options.format}`, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":["images.unsplash.com"],"remotePatterns":[],"endpoint":"astro/assets/endpoint/node"};
					// This is used by the @astrojs/node integration to locate images.
					// It's unused on other platforms, but on some platforms like Netlify (and presumably also Vercel)
					// new URL("dist/...") is interpreted by the bundler as a signal to include that directory
					// in the Lambda bundle, which would bloat the bundle with images.
					// To prevent this, we mark the URL construction as pure,
					// so that it's tree-shaken away for all platforms that don't need it.
					const outDir = /* #__PURE__ */ new URL("file:///C:/Users/Justo/Desktop/sinergia_valores_s.a/dist/client/");
					const assetsDir = /* #__PURE__ */ new URL("_astro", outDir);
					const getImage = async (options) => await getImage$1(options, imageConfig);

const ogImageSrc = new Proxy({"src":"/_astro/social.CWnIx2-K.png","width":1200,"height":600,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/images/social.png";
							}
							
							return target[name];
						}
					});

const SITE = {
  title: "Sinergia Valores S.A",
  tagline: "El puente hacia tu nuevo hogar Sinergia Valores.",
  description: "Garantiza tu futuro hogar en segundos - Solicita una fianza con nosotros.",
  description_short: "Garantiza tu futuro hogar en segundos.",
  url: "https://www.sinergiavalores.com",
  author: "Justo Becerra"
};
const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description
    }
  }
};
const ArrepentimientoFormInfo = {
  title: "Arrepentimiento",
  description: "Solicitar la revocación de un producto o servicio contratado con Sinergia Valores S.A. dentro de los 10 (diez) días corridos contados a partir de la fecha de recibido el contrato o de la disponibilidad efectiva del producto o servicio, lo que suceda último; de esta manera, podrás arrepentirte y deshacer la contratación del producto/servicio solicitado en ese plazo informado.",
  name: "Nombre Completo",
  // lastname: "Apellido",
  nacionality: "Nacionalidad",
  idnumber: "Documento y Numero",
  phonenumber: "Telefono/Celular de contacto",
  mail: "Mail",
  serviceorproduct: "Servicio o Producto",
  sendtext: "Enviar"
};
const questionsFrecuentes = [
  {
    question: "¿QUIENES SOMOS?",
    answer: "GRUPO DE PROFESIONALES MULTIDISCIPLINARIOS DEL RAMO LEGAL Y CONTABLE DEDICADOS A LA GESTIÓN DE SERVICIOS FINANCIEROS."
  },
  {
    question: "¿QUE ES LA FIANZA PARA ALQUILER DE SINERGIA VALORES S.A.?",
    answer: "¿QUE ES LA FIANZA PARA ALQUILER DE SINERGIA VALORES S.A.? ES UN AVAL NO PROPIETARIO A PARTIR DE UN EXHAUSTIVO ANÁLISIS CREDITICIO SOBRE EL POTENCIAL INQUILINO. EN CASO DE INCUMPLIMIENTO, A DIFERENCIA DE LAS GARANTÍAS PROPIETARIAS TRADICIONALES, SINERGIA VALORES S.A. CUBRE LAS OBLIGACIONES PENDIENTES Y LLEVA ADELANTE SIN COSTOS PARA EL PROPIETARIO TODAS LAS ACCIONES JUDICIALES Y EXTRAJUDICIALES NECESARIAS HASTA LA RESTITUCIÓN DEL INMUEBLE."
  },
  {
    question: "¿QUE DOCUMENTACIÓN ES NECESARIA PARA APLICAR EN EL SISTEMA DE FIANZAS PARA ALQUILER DE SINERGIA VALORES S.A.?",
    answer: "EN LA OPCIÓN DE REQUISITOS SE ENCUENTRA LA DOCUMENTACIÓN NECESARIA PARA EMPLEADOS, MONOTRIBUTISTAS, RESPONSABLES INSCRIPTOS PERSONA FÍSICA Y PERSONAS JURÍDICAS. (VÍNCULO REQUISITOS)"
  },
  {
    question: "¿QUE ES UN CO-GARANTE?",
    answer: "ES UNA PERSONA SELECCIONADA POR EL INQUILINO QUE AYUDA A CALIFICAR Y APLICAR PARA LA FIANZA DE SINERGIA VALORES S.A. DEBE TENER INGRESOS DEMOSTRABLES Y FIRMA JUNTO CON EL INQUILINO. NO ES NECESARIO QUE VIVAN EN LA PROPIEDAD."
  },
  {
    question: "¿CUANDO SE ABONA LA FIANZA?",
    answer: "SE ABONA CUANDO ESTE TODO LISTO PARA FIRMARSE EL CONTRATO DE ALQUILER."
  },
  {
    question: "¿QUE SUCEDE SI LA FIANZA ES ABONADA PERO LA OPERACIÓN INMOBILIARIA ES CANCELADA? ",
    answer: "SI LA FIANZA FUE ABONADA, PERO LA OPERACIÓN ES CANCELADA, POR NOVENTA DÍAS (90) ES POSIBLE UTILIZAR EL MONTO ABONADO PARA LA FIANZA DE ALQUILER DE OTRA PROPIEDAD Y SE ABONA SOLO LA DIFERENCIA DE LA FIANZA. SI NO SE REALIZA OTRA OPERACIÓN DE ALQUILER, SE PROCEDE A RESTITUIR EL VALOR ABONADO POR EL CLIENTE."
  },
  {
    question: "¿QUE NECESITO PARA COTIZAR EL SERVICIO?",
    answer: "ES POSIBLE MEDIANTE EL COTIZADOR GRATUITO (VINCULO A LA CALCULADORA) TENER UN PRESUPUESTO APROXIMADO.  EL PRESUPUESTO FINAL SE CONCLUYE EN BASE A LOS VALORES REALES DEL CONTRATO DE ALQUILER Y LA DOCUMENTACION REQUERIDA."
  },
  {
    question: "¿QUE ES Y QUE VENTAJA TIENE EL BUEN CUMPLIMIENTO?",
    answer: "SI EL INQUILINO ABONA EN TERMINO TANTO EL ALQUILER COMO LAS EXPENSAS, EL MISMO DISPONDRA DE UN DESCUENTO POR BUEN CUMPLIMIENTO EN LA RENOVACION DEL CONTRATO DE FIANZA PARA SU PROXIMO ALQUILER. EL MISMO ES VALIDO POR SEIS MESES (6), Y EN CASO DE NO UTILIZARLO ES POSIBLE EJECUTARSE SOBRE REFERIDO DE PARTE DEL CLIENTE."
  },
  {
    question: "¿COMO SE ABONA EL SERVICIO?",
    answer: "ALTERNATIVAS DE PAGO DISCRIMINADAS EN LA PAGINA Y OPCIONES DE FINANCIACION A MEDIDA. ES POSIBLE EN EFECTIVO O TRANSFERENCIA."
  },
  {
    question: "¿ES NECESARIO APORTAR INFORMACION DEL INMUEBLE O INMOBILIARIA AL MOMENTO DE PRESUPUESTAR EL SERVICIO?",
    answer: "NO, SOLO ES NECESARIO EL VALOR DE ALQUILER Y EXPENSAS, Y DE MANERA GRATUITA ES POSIBLE SABER SI CALIFICA PARA EL SERVICIO."
  },
  {
    question: "¿CUANTO TIEMPO TARDA EN APROBARSE LA FIANZA?",
    answer: "EL INQUILINO TIENE PREAPROBACION INMEDIATA Y EN 24 HS HABILE A APARTIR DE LA RECEPCION DE LA DOCUMENTACION COMPLETA TIENE LA APROBACION FINAL."
  },
  {
    question: "¿ES POSIBLE COORDINAR UNA REUNION?",
    answer: "SI, COORDINAMOS UNA REUNION PRESENCIAL O VIA ZOOM. EN CASO DE SER PRESENCIAL, ES POSIBLE COORDINARLAS EN NUESTRAS OFICINAS."
  },
  {
    question: "¿ES OBLIGATORIO DIRIGIRSE PERSONALMENTE A FIRMAR EL CONTRATO DE FIANZA?",
    answer: "NO ES OBLIGATORIO. DISPONEMOS DE 3 PROCEDIMIENTOS DE FIRMA: 1) PROCEDIMIENTO SEMI-PRESENCIAL, CUYA FIRMA ES OLOGRAFA AL MOMENTO DE LA FIRMA DEL CONTRATO DE ALQUILER, 2) PROCEDIMIENTO ONLINE, CUYA FIRMA Y CERTIFICACION ES DIGITAL POR MEDIO DE APLICACIÓN Y 3) PROCEDIMIENTO PRESENCIAL, CUYA FIRMA ES OLOGRAFA EN NUESTRAS OFICINAS."
  },
  {
    question: "¿COMO SE SI TENGO EL AVAL DE SINERGIA VALORES S.A.?",
    answer: `ES SIMPLE, LE ENVIAMOS AL MAIL DEL PROPIETARIO, INQUILINO E INMOBILIARIA EL AVAL NUESTRO CON FIRMA DIGITAL. 
    LA VALIDEZ DE LA FIRMA DIGITAL ES POSIBLE VERIFICARSE EN 
    <a target="_blank" href="https://www.argentina.gob.ar/jefatura/innovacion-publica/innovacion-administrativa/firma-digital/plataforma-de-firma-digital">Verificación Secretaria de Modernización</a>. 
    PARA MAS INFORMACION REFERIDA A LA FIRMA DIGITAL EN LA REPUBLICA ARGENTINA PODÉS VISITAR EL SITIO DE LA SECRETARIA DE MODERNIZACION DE PRESIDENCIA DE LA NACION. <a target="_blank" href="https://www.argentina.gob.ar/jefatura/innovacion-publica/innovacion-administrativa/firma-digital/plataforma-de-firma-digital">Información Firma Digital</a>.`
  },
  {
    question: "¿COMO SE GESTIONA EL RECLAMO ANTE INCLUMPLIENTO POR PARTE DEL INQUILINO?",
    answer: `SE REALIZA POR MEDIO DE LA PAGINA DE SINERGIA VALORES S.A. (VINCULO PLANILLA POR INCUMPLIMIENTO).`
  },
  {
    question: "¿TIENE EL PROPIETARIO GASTOS JUDICIALES O EXTRAJUDICIALES EN CASO DE INCUMPLIMIENTO?",
    answer: `NO, SINERGIA VALORES S.A. SE HACE CARGO DEL 100% DE LOS GASTOS JUDICIALES Y EXTRAJUDICIALES EN CASO DE INCUMPLIMIENTO.`
  },
  {
    question: "¿TIENE EL PROPIETARIO GASTOS POR LA GESTION DE LA FIANZA?",
    answer: `NO, EL INQUILINO ABONA EL 100 % DEL GASTO POR LA GESTION DE LA FIANZA.`
  },
  {
    question: "¿QUE COBERTURA Y PLAZO TIENE LA FIANZA DE SINERGIA VALORES S.A.?",
    answer: `LA MISMA CUBRE EL MONTO DE ALQUILER Y EXPENSAS DETALLADOS EN EL CONTRATO DE ALQUILER POR EL CUAL SE GESTIONA LA FIANZA HASTA LA RESTITUCION DEL INMUEBLE. EN EL CASO DE LAS EXPENSAS, COMO PUEDEN TENER UNA VARIACION LA MISMA ES AFIANZADA EN HASTA UN TREINTA POR CIENTO (30%) EN AJUSTE SEMESTRAL QUE PUEDA SUFRIR.`
  },
  {
    question: "¿ES POSIBLE COORDINAR UNA REUNION?",
    answer: `SI, COORDINAMOS UNA REUNION PRESENCIAL O VIA ZOOM. EN CASO DE SER PRESENCIAL, ES POSIBLE COORDINARLAS EN NUESTRAS OFICINAS.`
  },
  {
    question: "¿COMO SE SI MI FUTURO INQUILINO ESTA AVALADO POR SINERGIA VALORES S.A? ",
    answer: `UNA VEZ VERIFICADO Y CALIFICADO EL INQUILINO, Y EN CASO DE AVANZAR CON LA FIRMA DEL CONTRATO DE ALQUILER, NUESTRO EQUIPO ENVIA POR E-MAIL EL CONTRATO DE FIANZA CON FIRMA DIGITAL DE SINERGIA VALORES S.A. POR AL INQUILINO, PROPIETARIO E INMOBILIARIA. ESTO SE GESTIONA ANTES DE LA FIRMA DEL CONTRATO DE ALQUILER, PARA QUE TODAS LAS PARTES PUEDAN REVISARLAS CON ANTICIPACION.`
  },
  {
    question: "¿COMO PUEDO VERIFICAR SI LA FIANZA QUE RECIBI POR E-MAIL ES VALIDA LEGALMENTE?",
    answer: `EL CONTRATO DE FIANZA EMITIDO POR SINERGIA VALORES S.A ES FIRMADO DIGITALMENTE. LA VALIDEZ DE LA FIRMA DIGITAL ES POSIBLE VERIFICARSE EN Verificación Secretaria de Modernización. PARA MAS INFORMACION REFERIDA A LA FIRMA DIGITAL EN LA REPUBLICA ARGENTINA PODÉS VISITAR EL SITIO DE LA SECRETARIA DE MODERNIZACION DE PRESIDENCIA DE LA NACION. Información Firma Digital.`
  },
  {
    question: "¿QUE VENTAJAS TIENE FORMAR PARTE DE LA RED DE INMOBILIARIAS ADHERIDAS DE SINERGIA VALORES S.A.?",
    answer: `EN PRIMERO LUGAR, LOS INMUEBLES EN ALQUILER SON PUBLICADOS EN NUESTRA PAGINA Y REDES SOCIALES. EN SEGUNDO LUGAR, ESTAMOS PRESENTES POR MEDIOS PUBLICITARIOS, Y FORMARIAN PARTE DE NUESTROS ANUNCIOS. POR ULTIMO, LA INMOBILIARIA QUE SE ADHIERA AL SISTEMA DE FIANZAS DE SINERGIA VALORES S.A, FORMA PARTE DEL SISTEMA DE COMISIONES POR VOLUMEN DE CONTRATOS CONCERTADOS.`
  },
  {
    question: "¿QUE VENTAJAS TIENE EL SISTEMA DE FIANZAS DE SINERGIA VALORES S.A.?",
    answer: `LOS INQUILINOS SON ANALIZADOS DE MANERA EXHAUSTIVA EN MATERIA FINANCIERA Y DE HISTORIAL CREDITICIO, POR LO QUE TIENEN RECORD FINANCIERO OPTIMO. A SU VEZ SINERGIA VALORES S.A. PROVEE LIQUIDEZ INMEDIATA EN CASO INCUMPLIMIENTOS POR PARTE DEL INQUILINO HASTA LA RESTITUCION DEL BIEN. EL EQUIPO DE SINERGIA VALORES S.A. SE HACE CARGO DE EL PROCEDIMIENTO SIN GASTOS PARA LA INMOBILIARIA NI PROPIETARIO`
  },
  {
    question: "¿ES POSIBLE COORDINAR UNA REUNION?",
    answer: `SI, COORDINAMOS UNA REUNION PRESENCIAL O VIA ZOOM. EN CASO DE SER PRESENCIAL, ES POSIBLE COORDINARLAS EN LA INMOBILIARIA O EN NUESTRAS OFICINAS.`
  },
  {
    question: "¿SE UTILIZA EL MISMO MODELO DE CONTRATO DE ALQUILER?",
    answer: `SI, EL EQUIPO DE SIENRGIA VALORES S.A. SE COMUNICA CON LA INMOBILIARIA PARA AGILIZAR EL PROCEDIMIENTO A PARTIR DE UNA CLAUSUAL ANEXO, LA CUAL FORMA PARTE DEL CONTRATO DE FIANZA Y SE INCORPORA AL CONTRATO DE ALQUILER.`
  },
  {
    question: "¿QUE CANALES DE COMUNICACIÓN TENEMOS ANTE UNA CONSULTA TECNICA?",
    answer: `CONTAMOS CON CANALES DE COMUNICACIÓN VIA TELEFONICA, MAIL INSTITUCIONAL, PAGINA WEB Y OFICINAS.`
  },
  {
    question: "¿COMO PUEDO VERIFICAR SI LA FIANZA QUE RECIBI POR E-MAIL ES VALIDA LEGALMENTE?",
    answer: `EL CONTRATO DE FIANZA EMITIDO POR SINERGIA VALORES S.A ES FIRMADO DIGITALMENTE. LA VALIDEZ DE LA FIRMA DIGITAL ES POSIBLE VERIFICARSE EN Verificación Secretaria de Modernización. PARA MAS INFORMACION REFERIDA A LA FIRMA DIGITAL EN LA REPUBLICA ARGENTINA PODÉS VISITAR EL SITIO DE LA SECRETARIA DE MODERNIZACION DE PRESIDENCIA DE LA NACION. Información Firma Digital.`
  },
  {
    question: "¿DEBO COORDINAR LA FIRMA DEL CONTRATO DE LOCACION CON SINERGIA VALORES S.A.?",
    answer: `NO, SIGUE SIENDO COORDINADO POR LA INMOBILIARIA A SU CRITERIO Y EN BENEFICIO DE LA MEJOR ATENCION DE SUS CLIENTES.`
  }
];
const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}`,
  description: "Sinergia Valores Sistema de fianzas de alquiler 100 % digital con calificacion en 24 hs.",
  image: ogImageSrc
};

const icon = new Proxy({"src":"/_astro/icon.CvGbDubJ.png","width":32,"height":32,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/images/icon.png";
							}
							
							return target[name];
						}
					});

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Astro$7 = createAstro("https://sinergia&valores");
const $$Meta = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Meta;
  const defaultProps = {
    meta: SITE.description,
    structuredData: SEO.structuredData
  };
  const { meta = defaultProps.meta, structuredData = defaultProps.structuredData } = Astro2.props;
  const URL = `${Astro2.site}`;
  const author = SITE.author;
  const canonical = Astro2.url.href;
  Astro2.url.pathname;
  const ogTitle = OG.title;
  const ogDescription = OG.description;
  const socialImageRes = await getImage({
    src: OG.image,
    width: 1200,
    height: 600
  });
  const socialImage = Astro2.url.origin + socialImageRes.src;
  const languages = {
    en: ""
  };
  function createHref(lang, prefix, path) {
    const hasPrefix = path.startsWith(`/${prefix}/`);
    const basePath2 = hasPrefix ? path : `/${prefix}${path}`;
    const normalizedBasePath = basePath2.replace(/\/\/+/g, "/");
    return `${URL.slice(0, -1)}${normalizedBasePath}`;
  }
  const fullPath = Astro2.url.pathname;
  const alternateLanguageLinks = Object.entries(languages).map(([lang, prefix]) => {
    const basePath2 = fullPath;
    const href = createHref(lang, prefix, basePath2);
    return `<link rel="alternate" hreflang="${lang}" href="${href}" />`;
  }).join("\n");
  const appleTouchIcon = await getImage({
    src: icon,
    width: 180,
    height: 180,
    format: "png"
  });
  return renderTemplate`<!-- Inject structured data into the page if provided. This data is formatted as JSON-LD, a method recommended by Google for structured data pass:
     https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data -->${structuredData && renderTemplate(_a$2 || (_a$2 = __template$2(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(structuredData)))}<!-- Define the character set, description, author, and viewport settings --><meta charset="utf-8"><meta${addAttribute(meta, "content")} name="description"><meta name="web_author"${addAttribute(author, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><link rel="canonical"${addAttribute(canonical, "href")}>${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(alternateLanguageLinks)}` })}<!-- Facebook Meta Tags --><meta property="og:locale" content="en_US"><meta property="og:url"${addAttribute(URL, "content")}><meta property="og:type" content="website"><meta property="og:title"${addAttribute(ogTitle, "content")}><meta property="og:site_name"${addAttribute(SITE.title, "content")}><meta property="og:description"${addAttribute(ogDescription, "content")}><meta property="og:image"${addAttribute(socialImage, "content")}><meta content="1200" property="og:image:width"><meta content="600" property="og:image:height"><meta content="image/png" property="og:image:type"><!-- Twitter Meta Tags --><meta name="twitter:card" content="summary_large_image"><meta property="twitter:domain"${addAttribute(URL, "content")}><meta property="twitter:url"${addAttribute(URL, "content")}><meta name="twitter:title"${addAttribute(ogTitle, "content")}><meta name="twitter:description"${addAttribute(ogDescription, "content")}><meta name="twitter:image"${addAttribute(socialImage, "content")}><!-- Links to the webmanifest and sitemap --><link rel="manifest" href="/manifest.json"><!-- https://docs.astro.build/en/guides/integrations-guide/sitemap/ --><link rel="sitemap" href="/sitemap-index.xml"><!-- Links for favicons --><link href="/favicon.ico" rel="icon" sizes="any" type="image/x-icon"><!-- <link href={faviconSvg.src} rel="icon" type="image/svg+xml" sizes="any" /> --><meta name="mobile-web-app-capable" content="yes"><link${addAttribute(appleTouchIcon.src, "href")} rel="apple-touch-icon"><link${addAttribute(appleTouchIcon.src, "href")} rel="shortcut icon"><!-- Set theme color --><meta name="theme-color" content="#facc15">`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/Meta.astro", void 0);

const $$ThemeIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Dark Theme Toggle Button --><!-- This button is shown when the light theme is active, and when clicked, it switches the theme to dark -->${maybeRenderHead()}<button type="button" aria-label="Dark Theme Toggle" class="hs-dark-mode group flex h-8 w-8 items-center justify-center rounded-full font-medium text-neutral-600 outline-none ring-zinc-500 transition duration-300 hover:bg-neutral-200 hover:text-blue-50 hs-dark-mode-active:hidden dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-yellow-500 dark:focus:outline-none" data-hs-theme-click-value="dark"> <!-- The SVG displayed shows an abstract icon that represents the moon (dark theme) --> <svg class="h-4 w-4 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg> <!-- Light Theme Toggle Button --> <!-- This button is hidden by default and only appears when the dark theme is active, when clicked, it switches to the light theme --> </button> <button type="button" aria-label="Light Theme Toggle" class="hs-dark-mode group hidden h-8 w-8 items-center justify-center rounded-full font-medium text-neutral-600 outline-none ring-zinc-500 transition duration-300 hover:text-blue-50 hs-dark-mode-active:flex dark:text-neutral-400 dark:ring-zinc-200 dark:hover:bg-neutral-700 dark:hover:text-yellow-500 dark:focus:outline-none" data-hs-theme-click-value="light"> <!-- The SVG displayed shows a standard sun icon that stands for the light theme --> <svg class="h-4 w-4 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 8a2 2 0 1 0 4 4"></path><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg> </button>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ThemeIcon.astro", void 0);

const $$Astro$6 = createAstro("https://sinergia&valores");
const $$NavLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { url, name } = Astro2.props;
  return renderTemplate`<!--
Re-usable link component for navigation bar. Highlights the active link
by comparing the current URL with the href of each link.
We assign an ID matching the URL for easy reference in our script.
If URL is '/' (home page), assign ID as 'home' 
-->${maybeRenderHead()}<a${addAttribute(url === "/" ? "home" : url.replace("/", ""), "id")}${addAttribute(url, "href")} data-astro-prefetch class="rounded-lg font-gotham text-base text-neutral-600 outline-none ring-zinc-500 hover:text-neutral-500 focus-visible:ring dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-neutral-500 dark:focus:outline-none md:py-3 md:text-sm 2xl:text-base"> ${name} </a> ${renderScript($$result, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/links/NavLink.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/links/NavLink.astro", void 0);

const navBarLinks = [
  { name: "Inicio", url: "/" },
  { name: "Solicitud", url: "/solicitud" },
  { name: "Ayuda", url: "/ayuda" },
  { name: "Calculadora", url: "/calculadora" },
  { name: "Contacto", url: "/contacto" }
];
const footerLinks = [
  {
    section: "Redes Sociales",
    links: [
      { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61561059611052&mibextid=LQQJ4d" },
      { name: "Twitter", url: "https://twitter.com/" },
      { name: "Instagram", url: "https://www.instagram.com/sinergiavalores/" },
      { name: "Tiktok", url: "https://www.tiktok.com/@sinergia.valores?_t=8o3X7xTxBri&_r=1" }
    ]
  },
  {
    section: "Servicios",
    links: [
      { name: "Ayuda", url: "/ayuda" },
      { name: "Calculadora", url: "/calculadora" },
      { name: "Solicitud", url: "/solicitud" }
    ]
  }
];
const whatsappInfo = {
  PhoneNumber: "+5492216145726",
  Message: `Hola, me estoy comunicando del sitio web de Sinergia valores para hacer una consulta.`
};
const enStrings = {
  navBarLinks,
  footerLinks,
  whatsappInfo
};

const $$Astro$5 = createAstro("https://sinergia&valores");
const $$LightModeBrandLogo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$LightModeBrandLogo;
  const { width, height } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"${addAttribute(width || "120", "width")}${addAttribute(height || "60", "height")} height="1080.1551018097548" viewBox="0 0 3162.368325463131 1080.1551018097548"> <g transform="scale(8.118416273156555) translate(10, 10)"> <defs id="SvgjsDefs1045"><linearGradient id="SvgjsLinearGradient1050"><stop id="SvgjsStop1051" stop-color="#8f5e25" offset="0"></stop><stop id="SvgjsStop1052" stop-color="#fbf4a1" offset="0.5"></stop><stop id="SvgjsStop1053" stop-color="#8f5e25" offset="1"></stop></linearGradient><linearGradient id="SvgjsLinearGradient1054"><stop id="SvgjsStop1055" stop-color="#8f5e25" offset="0"></stop><stop id="SvgjsStop1056" stop-color="#fbf4a1" offset="0.5"></stop><stop id="SvgjsStop1057" stop-color="#8f5e25" offset="1"></stop></linearGradient></defs><g id="SvgjsG1046" transform="matrix(1.3075284239835347,0,0,1.3075284239835347,-27.526859060533795,-4.236635009339761)" fill="url(#SvgjsLinearGradient1050)"><g xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" font-family="Times New Roman" font-size="16" transform="scale(1 -1)"><g transform="translate(0 -96)"><g><path d="M 21.633,34.925 C 24.973,46.855 40.837,53.71 46.922,66.223 C 49.866,72.279 48.49,83.461 43.464,87.939 C 43.197,88.178 42.09,90.326 43.217,89.521 C 54.416,81.327 63.521,70.509 59.309,60.068 C 53.464,45.577 38.409,38.34 38.519,23.585 C 38.566,17.447 43.088,12.523 48.838,7.375 L 49.073,6.299 C 34.143,10.56 17.742,21.028 21.633,34.925 Z M 59.314,18.723 C 67.987,26.524 73.282,31.263 71.043,40.298 C 73.766,36.119 76.295,30.323 74.135,25.806 C 72.203,21.769 70.28,18.956 63.244,15.02 C 59.515,12.935 56.712,10.677 54.37,6.898 C 54.248,10.853 55.011,14.852 59.314,18.723 Z M 49.686,32.153 C 53.003,38.255 57.845,42.622 62.538,48.882 C 65.869,53.325 68.92,60.704 65.731,66.728 L 65.937,67.016 C 70.824,61.556 71.028,52.654 69.495,46.059 C 67.086,35.69 58.5,31.5 53.511,23.918 C 51.557,20.948 50.446,17.311 51,13.5 C 45.461,18.021 46.717,26.69 49.686,32.153 Z" stroke-linejoin="miter" stroke-linecap="round" stroke="none" stroke-width="0.75" fill="url(#SvgjsLinearGradient1050)" marker-start="none" marker-end="none" stroke-miterlimit="79.8403193612775"></path></g></g></g></g><g id="SvgjsG1047" transform="matrix(0.932482275033653,0,0,0.932482275033653,89.55240804555596,42.98324525360482)" fill="url(#SvgjsLinearGradient1054)"><path d="M6.3 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M20.6745 5.720000000000001 l0 14.28 l-3.14 0 l0 -14.28 l3.14 0 z M29.729 5.720000000000001 l5.96 9.58 l0.04 0 l0 -9.58 l2.94 0 l0 14.28 l-3.14 0 l-5.94 -9.56 l-0.04 0 l0 9.56 l-2.94 0 l0 -14.28 l3.12 0 z M55.283500000000004 5.720000000000001 l0 2.64 l-7.54 0 l0 3.06 l6.92 0 l0 2.44 l-6.92 0 l0 3.5 l7.7 0 l0 2.64 l-10.84 0 l0 -14.28 l10.68 0 z M68.438 5.720000000000001 c1.2 0 2.1968 0.37 2.99 1.11 s1.19 1.6833 1.19 2.83 c0 1.7867 -0.75334 2.98 -2.26 3.58 l0 0.04 c0.50666 0.14666 0.90332 0.39 1.19 0.73 s0.50332 0.73666 0.64998 1.19 s0.24 1.18 0.28 2.18 c0.05334 1.3067 0.24 2.18 0.56 2.62 l-3.14 0 c-0.17334 -0.44 -0.30668 -1.2667 -0.40002 -2.48 c-0.10666 -1.28 -0.34 -2.1166 -0.7 -2.51 s-0.94666 -0.59 -1.76 -0.59 l-3.16 0 l0 5.58 l-3.14 0 l0 -14.28 l7.7 0 z M67.33800000000001 12.18 c0.66666 0 1.19 -0.15 1.57 -0.45 s0.57 -0.83 0.57 -1.59 c0 -0.72 -0.18666 -1.23 -0.56 -1.53 s-0.90668 -0.45 -1.6 -0.45 l-3.44 0 l0 4.02 l3.46 0 z M84.7525 5.380000000000001 c1.6267 0 3.0066 0.47336 4.14 1.42 s1.76 2.1534 1.88 3.62 l-3 0 c-0.18666 -0.8 -0.54666 -1.4 -1.08 -1.8 s-1.18 -0.6 -1.94 -0.6 c-1.2267 0 -2.18 0.44334 -2.86 1.33 s-1.02 2.0766 -1.02 3.57 c0 1.4667 0.34666 2.63 1.04 3.49 s1.64 1.29 2.84 1.29 c2.0534 0 3.1866 -1.0267 3.4 -3.08 l-3.16 0 l0 -2.34 l6 0 l0 7.72 l-2 0 l-0.32 -1.62 c-1 1.3067 -2.3066 1.96 -3.92 1.96 c-2.1066 0 -3.8034 -0.69334 -5.09 -2.08 s-1.93 -3.1666 -1.93 -5.34 c0 -2.2134 0.64 -4.0234 1.92 -5.43 s2.98 -2.11 5.1 -2.11 z M99.847 5.720000000000001 l0 14.28 l-3.14 0 l0 -14.28 l3.14 0 z M112.9015 5.720000000000001 l5.34 14.28 l-3.26 0 l-1.08 -3.18 l-5.34 0 l-1.12 3.18 l-3.18 0 l5.42 -14.28 l3.22 0 z M111.2415 9.24 l-1.86 5.24 l3.7 0 l-1.8 -5.24 l-0.04 0 z M133.09050000000002 5.720000000000001 l3.18 10.04 l0.04 0 l3.22 -10.04 l3.24 0 l-4.74 14.28 l-3.54 0 l-4.64 -14.28 l3.24 0 z M153.365 5.720000000000001 l5.34 14.28 l-3.26 0 l-1.08 -3.18 l-5.34 0 l-1.12 3.18 l-3.18 0 l5.42 -14.28 l3.22 0 z M151.705 9.24 l-1.86 5.24 l3.7 0 l-1.8 -5.24 l-0.04 0 z M166.25950000000003 5.720000000000001 l0 11.64 l6.96 0 l0 2.64 l-10.1 0 l0 -14.28 l3.14 0 z M184.55400000000003 5.380000000000001 c2.1066 0 3.8034 0.7 5.09 2.1 s1.93 3.2134 1.93 5.44 c0 2.1734 -0.64666 3.9534 -1.94 5.34 s-2.9866 2.08 -5.08 2.08 c-2.1066 0 -3.8034 -0.69334 -5.09 -2.08 s-1.93 -3.1666 -1.93 -5.34 c0 -2.2134 0.64666 -4.0234 1.94 -5.43 s2.9866 -2.11 5.08 -2.11 z M180.67400000000004 12.92 c0 1.44 0.33998 2.5966 1.02 3.47 s1.6333 1.31 2.86 1.31 c1.2 0 2.1466 -0.43 2.84 -1.29 s1.04 -2.0234 1.04 -3.49 c0 -1.5333 -0.34334 -2.7334 -1.03 -3.6 s-1.6433 -1.3 -2.87 -1.3 c-1.2 0 -2.1434 0.43334 -2.83 1.3 s-1.03 2.0666 -1.03 3.6 z M204.58850000000004 5.720000000000001 c1.2 0 2.1968 0.37 2.99 1.11 s1.19 1.6833 1.19 2.83 c0 1.7867 -0.75334 2.98 -2.26 3.58 l0 0.04 c0.50666 0.14666 0.90332 0.39 1.19 0.73 s0.50332 0.73666 0.64998 1.19 s0.24 1.18 0.28 2.18 c0.05334 1.3067 0.24 2.18 0.56 2.62 l-3.14 0 c-0.17334 -0.44 -0.30668 -1.2667 -0.40002 -2.48 c-0.10666 -1.28 -0.34 -2.1166 -0.7 -2.51 s-0.94666 -0.59 -1.76 -0.59 l-3.16 0 l0 5.58 l-3.14 0 l0 -14.28 l7.7 0 z M203.48850000000002 12.18 c0.66666 0 1.19 -0.15 1.57 -0.45 s0.57 -0.83 0.57 -1.59 c0 -0.72 -0.18666 -1.23 -0.56 -1.53 s-0.90668 -0.45 -1.6 -0.45 l-3.44 0 l0 4.02 l3.46 0 z M225.18300000000002 5.720000000000001 l0 2.64 l-7.54 0 l0 3.06 l6.92 0 l0 2.44 l-6.92 0 l0 3.5 l7.7 0 l0 2.64 l-10.84 0 l0 -14.28 l10.68 0 z M235.55750000000003 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M260.4465 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M274.641 16.92 l0 3.08 l-3.14 0 l0 -3.08 l3.14 0 z M287.53550000000007 5.720000000000001 l5.34 14.28 l-3.26 0 l-1.08 -3.18 l-5.34 0 l-1.12 3.18 l-3.18 0 l5.42 -14.28 l3.22 0 z M285.87550000000005 9.24 l-1.86 5.24 l3.7 0 l-1.8 -5.24 l-0.04 0 z M300.25000000000006 16.92 l0 3.08 l-3.14 0 l0 -3.08 l3.14 0 z"></path></g> </g> </svg>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/LightModeBrandLogo.astro", void 0);

const $$Astro$4 = createAstro("https://sinergia&valores");
const $$DarkModeBrandLogo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$DarkModeBrandLogo;
  const { width, height } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"${addAttribute(width || "120", "width")}${addAttribute(height || "60", "height")} viewBox="0 0 3162.368325463131 1080.1551018097548"> <g transform="scale(8.118416273156555) translate(10, 10)"> <defs id="SvgjsDefs1045"><linearGradient id="SvgjsLinearGradient1050"><stop id="SvgjsStop1051" stop-color="#8f5e25" offset="0"></stop><stop id="SvgjsStop1052" stop-color="#fbf4a1" offset="0.5"></stop><stop id="SvgjsStop1053" stop-color="#8f5e25" offset="1"></stop></linearGradient><linearGradient id="SvgjsLinearGradient1054"><stop id="SvgjsStop1055" stop-color="#8f5e25" offset="0"></stop><stop id="SvgjsStop1056" stop-color="#fbf4a1" offset="0.5"></stop><stop id="SvgjsStop1057" stop-color="#8f5e25" offset="1"></stop></linearGradient></defs><g id="SvgjsG1046" transform="matrix(1.3075284239835347,0,0,1.3075284239835347,-27.526859060533795,-4.236635009339761)" fill="#000"><g xmlns="http://www.w3.org/2000/svg" stroke="black" font-family="Times New Roman" font-size="16" transform="scale(1 -1)"><g transform="translate(0 -96)"><g><path d="M 21.633,34.925 C 24.973,46.855 40.837,53.71 46.922,66.223 C 49.866,72.279 48.49,83.461 43.464,87.939 C 43.197,88.178 42.09,90.326 43.217,89.521 C 54.416,81.327 63.521,70.509 59.309,60.068 C 53.464,45.577 38.409,38.34 38.519,23.585 C 38.566,17.447 43.088,12.523 48.838,7.375 L 49.073,6.299 C 34.143,10.56 17.742,21.028 21.633,34.925 Z M 59.314,18.723 C 67.987,26.524 73.282,31.263 71.043,40.298 C 73.766,36.119 76.295,30.323 74.135,25.806 C 72.203,21.769 70.28,18.956 63.244,15.02 C 59.515,12.935 56.712,10.677 54.37,6.898 C 54.248,10.853 55.011,14.852 59.314,18.723 Z M 49.686,32.153 C 53.003,38.255 57.845,42.622 62.538,48.882 C 65.869,53.325 68.92,60.704 65.731,66.728 L 65.937,67.016 C 70.824,61.556 71.028,52.654 69.495,46.059 C 67.086,35.69 58.5,31.5 53.511,23.918 C 51.557,20.948 50.446,17.311 51,13.5 C 45.461,18.021 46.717,26.69 49.686,32.153 Z" stroke-linejoin="miter" stroke-linecap="round" stroke="none" stroke-width="0.75" marker-start="none" marker-end="none" stroke-miterlimit="79.8403193612775"></path></g></g></g></g><g id="SvgjsG1047" transform="matrix(0.932482275033653,0,0,0.932482275033653,89.55240804555596,42.98324525360482)" fill="#000"><path d="M6.3 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M20.6745 5.720000000000001 l0 14.28 l-3.14 0 l0 -14.28 l3.14 0 z M29.729 5.720000000000001 l5.96 9.58 l0.04 0 l0 -9.58 l2.94 0 l0 14.28 l-3.14 0 l-5.94 -9.56 l-0.04 0 l0 9.56 l-2.94 0 l0 -14.28 l3.12 0 z M55.283500000000004 5.720000000000001 l0 2.64 l-7.54 0 l0 3.06 l6.92 0 l0 2.44 l-6.92 0 l0 3.5 l7.7 0 l0 2.64 l-10.84 0 l0 -14.28 l10.68 0 z M68.438 5.720000000000001 c1.2 0 2.1968 0.37 2.99 1.11 s1.19 1.6833 1.19 2.83 c0 1.7867 -0.75334 2.98 -2.26 3.58 l0 0.04 c0.50666 0.14666 0.90332 0.39 1.19 0.73 s0.50332 0.73666 0.64998 1.19 s0.24 1.18 0.28 2.18 c0.05334 1.3067 0.24 2.18 0.56 2.62 l-3.14 0 c-0.17334 -0.44 -0.30668 -1.2667 -0.40002 -2.48 c-0.10666 -1.28 -0.34 -2.1166 -0.7 -2.51 s-0.94666 -0.59 -1.76 -0.59 l-3.16 0 l0 5.58 l-3.14 0 l0 -14.28 l7.7 0 z M67.33800000000001 12.18 c0.66666 0 1.19 -0.15 1.57 -0.45 s0.57 -0.83 0.57 -1.59 c0 -0.72 -0.18666 -1.23 -0.56 -1.53 s-0.90668 -0.45 -1.6 -0.45 l-3.44 0 l0 4.02 l3.46 0 z M84.7525 5.380000000000001 c1.6267 0 3.0066 0.47336 4.14 1.42 s1.76 2.1534 1.88 3.62 l-3 0 c-0.18666 -0.8 -0.54666 -1.4 -1.08 -1.8 s-1.18 -0.6 -1.94 -0.6 c-1.2267 0 -2.18 0.44334 -2.86 1.33 s-1.02 2.0766 -1.02 3.57 c0 1.4667 0.34666 2.63 1.04 3.49 s1.64 1.29 2.84 1.29 c2.0534 0 3.1866 -1.0267 3.4 -3.08 l-3.16 0 l0 -2.34 l6 0 l0 7.72 l-2 0 l-0.32 -1.62 c-1 1.3067 -2.3066 1.96 -3.92 1.96 c-2.1066 0 -3.8034 -0.69334 -5.09 -2.08 s-1.93 -3.1666 -1.93 -5.34 c0 -2.2134 0.64 -4.0234 1.92 -5.43 s2.98 -2.11 5.1 -2.11 z M99.847 5.720000000000001 l0 14.28 l-3.14 0 l0 -14.28 l3.14 0 z M112.9015 5.720000000000001 l5.34 14.28 l-3.26 0 l-1.08 -3.18 l-5.34 0 l-1.12 3.18 l-3.18 0 l5.42 -14.28 l3.22 0 z M111.2415 9.24 l-1.86 5.24 l3.7 0 l-1.8 -5.24 l-0.04 0 z M133.09050000000002 5.720000000000001 l3.18 10.04 l0.04 0 l3.22 -10.04 l3.24 0 l-4.74 14.28 l-3.54 0 l-4.64 -14.28 l3.24 0 z M153.365 5.720000000000001 l5.34 14.28 l-3.26 0 l-1.08 -3.18 l-5.34 0 l-1.12 3.18 l-3.18 0 l5.42 -14.28 l3.22 0 z M151.705 9.24 l-1.86 5.24 l3.7 0 l-1.8 -5.24 l-0.04 0 z M166.25950000000003 5.720000000000001 l0 11.64 l6.96 0 l0 2.64 l-10.1 0 l0 -14.28 l3.14 0 z M184.55400000000003 5.380000000000001 c2.1066 0 3.8034 0.7 5.09 2.1 s1.93 3.2134 1.93 5.44 c0 2.1734 -0.64666 3.9534 -1.94 5.34 s-2.9866 2.08 -5.08 2.08 c-2.1066 0 -3.8034 -0.69334 -5.09 -2.08 s-1.93 -3.1666 -1.93 -5.34 c0 -2.2134 0.64666 -4.0234 1.94 -5.43 s2.9866 -2.11 5.08 -2.11 z M180.67400000000004 12.92 c0 1.44 0.33998 2.5966 1.02 3.47 s1.6333 1.31 2.86 1.31 c1.2 0 2.1466 -0.43 2.84 -1.29 s1.04 -2.0234 1.04 -3.49 c0 -1.5333 -0.34334 -2.7334 -1.03 -3.6 s-1.6433 -1.3 -2.87 -1.3 c-1.2 0 -2.1434 0.43334 -2.83 1.3 s-1.03 2.0666 -1.03 3.6 z M204.58850000000004 5.720000000000001 c1.2 0 2.1968 0.37 2.99 1.11 s1.19 1.6833 1.19 2.83 c0 1.7867 -0.75334 2.98 -2.26 3.58 l0 0.04 c0.50666 0.14666 0.90332 0.39 1.19 0.73 s0.50332 0.73666 0.64998 1.19 s0.24 1.18 0.28 2.18 c0.05334 1.3067 0.24 2.18 0.56 2.62 l-3.14 0 c-0.17334 -0.44 -0.30668 -1.2667 -0.40002 -2.48 c-0.10666 -1.28 -0.34 -2.1166 -0.7 -2.51 s-0.94666 -0.59 -1.76 -0.59 l-3.16 0 l0 5.58 l-3.14 0 l0 -14.28 l7.7 0 z M203.48850000000002 12.18 c0.66666 0 1.19 -0.15 1.57 -0.45 s0.57 -0.83 0.57 -1.59 c0 -0.72 -0.18666 -1.23 -0.56 -1.53 s-0.90668 -0.45 -1.6 -0.45 l-3.44 0 l0 4.02 l3.46 0 z M225.18300000000002 5.720000000000001 l0 2.64 l-7.54 0 l0 3.06 l6.92 0 l0 2.44 l-6.92 0 l0 3.5 l7.7 0 l0 2.64 l-10.84 0 l0 -14.28 l10.68 0 z M235.55750000000003 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M260.4465 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M274.641 16.92 l0 3.08 l-3.14 0 l0 -3.08 l3.14 0 z M287.53550000000007 5.720000000000001 l5.34 14.28 l-3.26 0 l-1.08 -3.18 l-5.34 0 l-1.12 3.18 l-3.18 0 l5.42 -14.28 l3.22 0 z M285.87550000000005 9.24 l-1.86 5.24 l3.7 0 l-1.8 -5.24 l-0.04 0 z M300.25000000000006 16.92 l0 3.08 l-3.14 0 l0 -3.08 l3.14 0 z"></path></g> </g> </svg>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/DarkModeBrandLogo.astro", void 0);

const $$Astro$3 = createAstro("https://sinergia&valores");
const $$WhatsAppRedirect = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$WhatsAppRedirect;
  const { PhoneNumber, Message } = Astro2.props;
  const encodedMessage = encodeURIComponent(Message);
  const whatsappURL = `https://wa.me/${PhoneNumber}?text=${encodedMessage}`;
  return renderTemplate`${maybeRenderHead()}<div class="group"> <a${addAttribute(whatsappURL, "href")} target="_blank" rel="noopener noreferrer" class="flex cursor-pointer items-center gap-4"> ${renderComponent($$result, "FaWhatsapp", FaWhatsapp, { "size": 40, "className": "fill-current text-black ring-zinc-500 group-hover:text-neutral-500 dark:text-neutral-400 dark:ring-zinc-200 dark:focus:outline-none dark:group-hover:text-neutral-500" })} <h3 class="rounded-lg text-base text-sm font-bold font-medium text-black outline-none ring-zinc-500 group-hover:text-neutral-500 dark:text-neutral-400 dark:ring-zinc-200 dark:focus:outline-none dark:group-hover:text-neutral-500 md:py-3 md:text-sm 2xl:text-base"> ${PhoneNumber} </h3> </a> </div>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/WhatsAppRedirect.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<!-- Main header component -->", '<header class="sticky inset-x-0 top-4 z-50 flex w-full flex-wrap text-sm md:flex-nowrap md:justify-start"> <!-- Navigation container --> <nav class="relative mx-2 w-full rounded-[36px] border border-yellow-100/40 bg-yellow-50/60 px-4 py-3 backdrop-blur-md dark:border-neutral-700/40 dark:bg-neutral-800/80 dark:backdrop-blur-md md:flex md:items-center md:justify-between md:px-6 md:py-0 lg:px-8 xl:mx-auto" aria-label="Global"> <div class="flex items-center justify-between"> <!-- Brand logo --> <a class="hidden flex-none rounded-lg text-xl font-bold outline-none ring-zinc-500 focus-visible:ring hs-dark-mode-active:block dark:ring-zinc-200 dark:focus:outline-none"', ' aria-label="Brand"> ', ' </a> <a class="flex-none rounded-lg text-xl font-bold outline-none ring-zinc-500 focus-visible:ring hs-dark-mode-active:hidden dark:ring-zinc-200 dark:focus:outline-none"', ' aria-label="Brand"> ', ' </a> <!-- Collapse toggle for smaller screens --> <div class="ml-auto mr-5 md:hidden"> <button type="button" class="hs-collapse-toggle flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-neutral-600 transition duration-300 hover:bg-neutral-200 disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:outline-none" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation"> <svg class="h-[1.25rem] w-[1.25rem] flex-shrink-0 hs-collapse-open:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="3" x2="21" y1="6" y2="6"></line> <line x1="3" x2="21" y1="12" y2="12"></line> <line x1="3" x2="21" y1="18" y2="18"></line> </svg> <svg class="hidden h-[1.25rem] w-[1.25rem] flex-shrink-0 hs-collapse-open:block" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path> </svg> </button> </div> <!-- ThemeIcon component specifically for smaller screens --> <span class="inline-block md:hidden"> ', ' </span> </div> <!-- Contains navigation links --> <div id="navbar-collapse-with-animation" class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:block"> <!-- Navigation links container --> <div class="mt-5 flex flex-col gap-x-0 gap-y-4 md:mt-0 md:flex-row md:items-center md:justify-end md:gap-x-4 md:gap-y-0 md:ps-7 lg:gap-x-7"> ', " <!-- Navigation links and Authentication component --> ", ' <!-- ThemeIcon component specifically for larger screens --> <span class="hidden md:inline-block"> ', ' </span> </div> </div> </nav> </header> <!-- Theme Appearance script to manage light/dark modes --> <script>\n  const HSThemeAppearance = {\n    init() {\n      const defaultTheme = "default";\n      let theme = localStorage.getItem("hs_theme") || defaultTheme;\n\n      if (document.querySelector("html").classList.contains("dark")) return;\n      this.setAppearance(theme);\n    },\n    _resetStylesOnLoad() {\n      const $resetStyles = document.createElement("style");\n      $resetStyles.innerText = `*{transition: unset !important;}`;\n      $resetStyles.setAttribute("data-hs-appearance-onload-styles", "");\n      document.head.appendChild($resetStyles);\n      return $resetStyles;\n    },\n    setAppearance(theme, saveInStore = true, dispatchEvent = true) {\n      const $resetStylesEl = this._resetStylesOnLoad();\n\n      if (saveInStore) {\n        localStorage.setItem("hs_theme", theme);\n      }\n\n      if (theme === "auto") {\n        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";\n      }\n\n      document.querySelector("html").classList.remove("dark");\n      document.querySelector("html").classList.remove("default");\n      document.querySelector("html").classList.remove("auto");\n\n      document.querySelector("html").classList.add(this.getOriginalAppearance());\n\n      setTimeout(() => {\n        $resetStylesEl.remove();\n      });\n\n      if (dispatchEvent) {\n        window.dispatchEvent(new CustomEvent("on-hs-appearance-change", { detail: theme }));\n      }\n    },\n    getAppearance() {\n      let theme = this.getOriginalAppearance();\n      if (theme === "auto") {\n        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";\n      }\n      return theme;\n    },\n    getOriginalAppearance() {\n      const defaultTheme = "default";\n      return localStorage.getItem("hs_theme") || defaultTheme;\n    },\n  };\n  HSThemeAppearance.init();\n\n  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {\n    if (HSThemeAppearance.getOriginalAppearance() === "auto") {\n      HSThemeAppearance.setAppearance("auto", false);\n    }\n  });\n\n  window.addEventListener("load", () => {\n    const $clickableThemes = document.querySelectorAll("[data-hs-theme-click-value]");\n    const $switchableThemes = document.querySelectorAll("[data-hs-theme-switch]");\n\n    $clickableThemes.forEach(($item) => {\n      $item.addEventListener("click", () => HSThemeAppearance.setAppearance($item.getAttribute("data-hs-theme-click-value"), true, $item));\n    });\n\n    $switchableThemes.forEach(($item) => {\n      $item.addEventListener("change", (e) => {\n        HSThemeAppearance.setAppearance(e.target.checked ? "dark" : "default");\n      });\n\n      $item.checked = HSThemeAppearance.getAppearance() === "dark";\n    });\n\n    window.addEventListener("on-hs-appearance-change", (e) => {\n      $switchableThemes.forEach(($item) => {\n        $item.checked = e.detail === "dark";\n      });\n    });\n  });\n  // Function to update the logo based on the current theme\n  function updateLogo() {\n    const brandLogo = document.getElementById("brand-logo");\n    const isDarkMode = document.documentElement.classList.contains("dark");\n    brandLogo.src = isDarkMode ? "{darkModeLogo}" : "{lightModeLogo}";\n  }\n\n  // Initial logo update\n  updateLogo();\n\n  // Update the logo when the theme changes\n  window.addEventListener("on-hs-appearance-change", updateLogo);\n<\/script> <!--Import the necessary Collapse and Overlay plugins--> <!--https://preline.co/plugins/html/collapse.html--> <!--https://preline.co/plugins/html/overlay.html--> <script src="/scripts/vendor/preline/collapse/index.js"><\/script> <script src="/scripts/vendor/preline/overlay/index.js"><\/script>'], ["<!-- Main header component -->", '<header class="sticky inset-x-0 top-4 z-50 flex w-full flex-wrap text-sm md:flex-nowrap md:justify-start"> <!-- Navigation container --> <nav class="relative mx-2 w-full rounded-[36px] border border-yellow-100/40 bg-yellow-50/60 px-4 py-3 backdrop-blur-md dark:border-neutral-700/40 dark:bg-neutral-800/80 dark:backdrop-blur-md md:flex md:items-center md:justify-between md:px-6 md:py-0 lg:px-8 xl:mx-auto" aria-label="Global"> <div class="flex items-center justify-between"> <!-- Brand logo --> <a class="hidden flex-none rounded-lg text-xl font-bold outline-none ring-zinc-500 focus-visible:ring hs-dark-mode-active:block dark:ring-zinc-200 dark:focus:outline-none"', ' aria-label="Brand"> ', ' </a> <a class="flex-none rounded-lg text-xl font-bold outline-none ring-zinc-500 focus-visible:ring hs-dark-mode-active:hidden dark:ring-zinc-200 dark:focus:outline-none"', ' aria-label="Brand"> ', ' </a> <!-- Collapse toggle for smaller screens --> <div class="ml-auto mr-5 md:hidden"> <button type="button" class="hs-collapse-toggle flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-neutral-600 transition duration-300 hover:bg-neutral-200 disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:outline-none" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation"> <svg class="h-[1.25rem] w-[1.25rem] flex-shrink-0 hs-collapse-open:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="3" x2="21" y1="6" y2="6"></line> <line x1="3" x2="21" y1="12" y2="12"></line> <line x1="3" x2="21" y1="18" y2="18"></line> </svg> <svg class="hidden h-[1.25rem] w-[1.25rem] flex-shrink-0 hs-collapse-open:block" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path> </svg> </button> </div> <!-- ThemeIcon component specifically for smaller screens --> <span class="inline-block md:hidden"> ', ' </span> </div> <!-- Contains navigation links --> <div id="navbar-collapse-with-animation" class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:block"> <!-- Navigation links container --> <div class="mt-5 flex flex-col gap-x-0 gap-y-4 md:mt-0 md:flex-row md:items-center md:justify-end md:gap-x-4 md:gap-y-0 md:ps-7 lg:gap-x-7"> ', " <!-- Navigation links and Authentication component --> ", ' <!-- ThemeIcon component specifically for larger screens --> <span class="hidden md:inline-block"> ', ' </span> </div> </div> </nav> </header> <!-- Theme Appearance script to manage light/dark modes --> <script>\n  const HSThemeAppearance = {\n    init() {\n      const defaultTheme = "default";\n      let theme = localStorage.getItem("hs_theme") || defaultTheme;\n\n      if (document.querySelector("html").classList.contains("dark")) return;\n      this.setAppearance(theme);\n    },\n    _resetStylesOnLoad() {\n      const $resetStyles = document.createElement("style");\n      $resetStyles.innerText = \\`*{transition: unset !important;}\\`;\n      $resetStyles.setAttribute("data-hs-appearance-onload-styles", "");\n      document.head.appendChild($resetStyles);\n      return $resetStyles;\n    },\n    setAppearance(theme, saveInStore = true, dispatchEvent = true) {\n      const $resetStylesEl = this._resetStylesOnLoad();\n\n      if (saveInStore) {\n        localStorage.setItem("hs_theme", theme);\n      }\n\n      if (theme === "auto") {\n        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";\n      }\n\n      document.querySelector("html").classList.remove("dark");\n      document.querySelector("html").classList.remove("default");\n      document.querySelector("html").classList.remove("auto");\n\n      document.querySelector("html").classList.add(this.getOriginalAppearance());\n\n      setTimeout(() => {\n        $resetStylesEl.remove();\n      });\n\n      if (dispatchEvent) {\n        window.dispatchEvent(new CustomEvent("on-hs-appearance-change", { detail: theme }));\n      }\n    },\n    getAppearance() {\n      let theme = this.getOriginalAppearance();\n      if (theme === "auto") {\n        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";\n      }\n      return theme;\n    },\n    getOriginalAppearance() {\n      const defaultTheme = "default";\n      return localStorage.getItem("hs_theme") || defaultTheme;\n    },\n  };\n  HSThemeAppearance.init();\n\n  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {\n    if (HSThemeAppearance.getOriginalAppearance() === "auto") {\n      HSThemeAppearance.setAppearance("auto", false);\n    }\n  });\n\n  window.addEventListener("load", () => {\n    const $clickableThemes = document.querySelectorAll("[data-hs-theme-click-value]");\n    const $switchableThemes = document.querySelectorAll("[data-hs-theme-switch]");\n\n    $clickableThemes.forEach(($item) => {\n      $item.addEventListener("click", () => HSThemeAppearance.setAppearance($item.getAttribute("data-hs-theme-click-value"), true, $item));\n    });\n\n    $switchableThemes.forEach(($item) => {\n      $item.addEventListener("change", (e) => {\n        HSThemeAppearance.setAppearance(e.target.checked ? "dark" : "default");\n      });\n\n      $item.checked = HSThemeAppearance.getAppearance() === "dark";\n    });\n\n    window.addEventListener("on-hs-appearance-change", (e) => {\n      $switchableThemes.forEach(($item) => {\n        $item.checked = e.detail === "dark";\n      });\n    });\n  });\n  // Function to update the logo based on the current theme\n  function updateLogo() {\n    const brandLogo = document.getElementById("brand-logo");\n    const isDarkMode = document.documentElement.classList.contains("dark");\n    brandLogo.src = isDarkMode ? "{darkModeLogo}" : "{lightModeLogo}";\n  }\n\n  // Initial logo update\n  updateLogo();\n\n  // Update the logo when the theme changes\n  window.addEventListener("on-hs-appearance-change", updateLogo);\n<\/script> <!--Import the necessary Collapse and Overlay plugins--> <!--https://preline.co/plugins/html/collapse.html--> <!--https://preline.co/plugins/html/overlay.html--> <script src="/scripts/vendor/preline/collapse/index.js"><\/script> <script src="/scripts/vendor/preline/overlay/index.js"><\/script>'])), maybeRenderHead(), addAttribute("/", "href"), renderComponent($$result, "LightModeBrandLogo", $$LightModeBrandLogo, {}), addAttribute("/", "href"), renderComponent($$result, "DarkModeBrandLogo", $$DarkModeBrandLogo, {}), renderComponent($$result, "ThemeIcon", $$ThemeIcon, {}), renderComponent($$result, "WhatsAppRedirect", $$WhatsAppRedirect, { "PhoneNumber": enStrings.whatsappInfo.PhoneNumber, "Message": enStrings.whatsappInfo.Message }), enStrings.navBarLinks.map((link) => renderTemplate`${renderComponent($$result, "NavLink", $$NavLink, { "url": link.url, "name": link.name })}`), renderComponent($$result, "ThemeIcon", $$ThemeIcon, {}));
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/Navbar.astro", void 0);

const $$FooterSection = createComponent(($$result, $$props, $$slots) => {
  const strings = enStrings;
  const sectionThreeTitle = "Cont\xE1ctanos";
  const arrepentimiento = "Arrepentimiento";
  return renderTemplate`${maybeRenderHead()}<footer class="w-full bg-neutral-300 dark:bg-neutral-900"> <div class="mx-auto w-full max-w-[85rem] px-4 py-10 sm:px-6 lg:px-16 lg:pt-20 2xl:max-w-screen-2xl"> <div class="grid grid-cols-2 gap-6 md:grid-cols-4"> <div class="col-span-full hidden hs-dark-mode-active:block lg:col-span-1"> ${renderComponent($$result, "LightModeBrandLogo", $$LightModeBrandLogo, {})} </div> <div class="col-span-full hs-dark-mode-active:hidden lg:col-span-1"> ${renderComponent($$result, "DarkModeBrandLogo", $$DarkModeBrandLogo, {})} </div> ${strings.footerLinks.map((section) => renderTemplate`<div class="col-span-1"> <h3 class="font-gotham text-neutral-800 dark:text-neutral-200">${section.section}</h3> <ul${addAttribute(`mt-3 flex w-fit ${section.section === "Servicios" && "flex-col"} ${section.section === "Redes Sociales" && "flex-wrap"} gap-4 lg:flex-row`, "class")}> ${section.links.map((link) => renderTemplate`<li> <a${addAttribute(link.url, "href")} target="_blank"${addAttribute(`inline-flex gap-x-2 text-nowrap rounded-lg border-yellow-500 font-nunito text-neutral-600 outline-none ring-zinc-500 transition duration-300 focus-visible:ring dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-yellow-400 dark:focus:outline-none`, "class")}> ${section.section === "Servicios" ? link.name : link.name === "Instagram" ? renderTemplate`${renderComponent($$result, "FaInstagram", FaInstagram, {})}` : link.name === "Tiktok" ? renderTemplate`${renderComponent($$result, "FaTiktok", FaTiktok, {})}` : link.name === "Facebook" ? renderTemplate`${renderComponent($$result, "FaFacebook", FaFacebook, {})}` : link.name === "Twitter" ? renderTemplate`${renderComponent($$result, "FaXTwitter", FaXTwitter, {})}` : link.name} </a> </li>`)} </ul> </div>`)} <div class="col-span-1 hidden justify-between md:flex"> <div class="flex h-fit w-fit items-center justify-center rounded-2xl bg-white p-2 dark:bg-black md:ml-auto xl:mx-auto"> <a href="/contacto" class="cursor-pointer rounded-lg border-2 border-black p-2 font-gotham text-neutral-800 hover:border-yellow-500 hover:text-yellow-500 dark:border-white dark:text-neutral-200 dark:hover:border-yellow-400 dark:hover:text-yellow-400"> ${sectionThreeTitle} </a> </div> <div class="flex h-fit w-fit items-center justify-center rounded-2xl bg-white p-2 dark:bg-black md:ml-auto xl:mx-auto"> <a href="/arrepentimiento" class="cursor-pointer rounded-lg border-2 border-black p-2 font-gotham text-neutral-800 hover:border-yellow-500 hover:text-yellow-500 dark:border-white dark:text-neutral-200 dark:hover:border-yellow-400 dark:hover:text-yellow-400"> ${arrepentimiento} </a> </div> </div> <div class="col-span-1 flex h-fit w-fit items-center justify-center rounded-2xl bg-white p-2 dark:bg-black md:ml-auto md:hidden xl:mx-auto"> <a href="/contacto" class="cursor-pointer rounded-lg border-2 border-black p-2 font-gotham text-neutral-800 hover:border-yellow-50 hover:text-yellow-50 dark:border-white dark:text-neutral-200 dark:hover:border-yellow-400 dark:hover:text-yellow-400"> ${sectionThreeTitle} </a> </div> <div class="col-span-1 flex h-fit w-fit items-center justify-center rounded-2xl bg-white p-2 dark:bg-black md:ml-auto md:hidden xl:mx-auto"> <a href="/arrepentimiento" class="cursor-pointer rounded-lg border-2 border-black p-2 font-gotham text-neutral-800 hover:border-yellow-50 hover:text-yellow-50 dark:border-white dark:text-neutral-200 dark:hover:border-yellow-400 dark:hover:text-yellow-400"> ${arrepentimiento} </a> </div> </div> <div class="mt-9 grid gap-y-2 sm:mt-12 sm:flex sm:items-center sm:justify-between sm:gap-y-0"> <div class="flex items-center justify-between"> <p class="font-nunito text-sm text-neutral-600 dark:text-neutral-400">
© <span id="current-year"></span> ${SITE.title}.
</p> </div> </div> <!-- Contenedor de la imagen --> <div class="mt-6 flex justify-end"> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1134.7167974729828!2d-57.952428592613366!3d-34.910013496124584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e637e73ab81b%3A0x9835c71d1ffd0582!2sC.%205%20668%2C%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1722559777561!5m2!1ses-419!2sar" class="h-24" width="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> <a href="http://qr.afip.gob.ar/?qr=Goz8RzK5XRZ32i-lGg5AvQ,," target="_F960AFIPInfo"> <img src="http://www.afip.gob.ar/images/f960/DATAWEB.jpg" class="w-16 h-24"> </a> </div> ${renderScript($$result, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/FooterSection.astro?astro&type=script&index=0&lang.ts")} </div> </footer>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/FooterSection.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro("https://sinergia&valores");
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title = SITE.title, meta, structuredData, lang = "en" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["<!--\nThis is the main structure for the page.\nWe set the language of the page to English and add classes for scrollbar and scroll behavior.\n--><html", ' class="lenis lenis-smooth scroll-pt-16 scrollbar-hide astro-ouamjn2i"> <head><!-- Adding metadata to the HTML document -->', "<!-- Define the title of the page --><title>", '</title><script>\n      // Script to handle dark mode. It will check if the theme is stored in localStorage or if dark theme is preferred by system settings\n      if (\n        localStorage.getItem("hs_theme") === "dark" ||\n        (!("hs_theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)\n      ) {\n        document.documentElement.classList.add("dark");\n      } else {\n        document.documentElement.classList.remove("dark");\n      }\n    <\/script><link rel="stylesheet" href="../styles/global.css"><script src="/scripts/vendor/lenis/lenis.js"><\/script><script>\n      // Script to handle Lenis library settings for smooth scrolling\n      const lenis = new Lenis();\n\n      function raf(time) {\n        lenis.raf(time);\n        requestAnimationFrame(raf);\n      }\n\n      requestAnimationFrame(raf);\n    <\/script>', '</head> <body class="bg-neutral-200 selection:bg-yellow-400 selection:text-neutral-700 dark:bg-neutral-800 astro-ouamjn2i"> <!--\n    Setting up the main structure of the page.\n    The Navbar is placed at the top, with a slot for the main content and FooterSection at the bottom.\n    --> <div class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 astro-ouamjn2i"> ', ' <main class="astro-ouamjn2i"> ', " </main> </div> ", "  </body> </html>"])), addAttribute(lang, "lang"), renderComponent($$result, "Meta", $$Meta, { "meta": meta, "structuredData": structuredData, "class": "astro-ouamjn2i" }), title, renderHead(), renderComponent($$result, "Navbar", $$Navbar, { "class": "astro-ouamjn2i" }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "FooterSection", $$FooterSection, { "class": "astro-ouamjn2i" }));
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/layouts/MainLayout.astro", void 0);

const Icons = {
  confianza: {
    paths: [
      {
        d: "M5 19.0793L7.73333 16.4126L5 13.6793L2.33333 16.4126L5 19.0793ZM24.1 18.7459L27 14.0793L29.9333 18.7459H24.1ZM16 16.4126C14.8889 16.4126 13.9444 16.0237 13.1667 15.2459C12.3889 14.4682 12 13.5237 12 12.4126C12 11.2793 12.3889 10.3293 13.1667 9.5626C13.9444 8.79593 14.8889 8.4126 16 8.4126C17.1333 8.4126 18.0833 8.79593 18.85 9.5626C19.6167 10.3293 20 11.2793 20 12.4126C20 13.5237 19.6167 14.4682 18.85 15.2459C18.0833 16.0237 17.1333 16.4126 16 16.4126ZM16.0117 10.4126C15.4483 10.4126 14.9722 10.6031 14.5833 10.9842C14.1944 11.3653 14 11.8375 14 12.4009C14 12.9643 14.1928 13.4404 14.5784 13.8293C14.9639 14.2182 15.4417 14.4126 16.0117 14.4126C16.5817 14.4126 17.0556 14.2198 17.4333 13.8342C17.8111 13.4487 18 12.9709 18 12.4009C18 11.8309 17.8095 11.357 17.4284 10.9793C17.0473 10.6015 16.5751 10.4126 16.0117 10.4126ZM0 24.4126V22.6459C0 21.769 0.466667 21.0664 1.4 20.5382C2.33333 20.01 3.53776 19.7459 5.01327 19.7459C5.28344 19.7459 5.54322 19.7515 5.7926 19.7626C6.04198 19.7737 6.28889 19.7985 6.53333 19.8368C6.35556 20.2207 6.22222 20.6078 6.13333 20.9982C6.04444 21.3887 6 21.8046 6 22.2459V24.4126H0ZM8 24.4126V22.2459C8 20.8015 8.73889 19.6348 10.2167 18.7459C11.6944 17.857 13.6222 17.4126 16 17.4126C18.4 17.4126 20.3333 17.857 21.8 18.7459C23.2667 19.6348 24 20.8015 24 22.2459V24.4126H8ZM27 19.7459C28.5 19.7459 29.7083 20.01 30.625 20.5382C31.5417 21.0664 32 21.769 32 22.6459V24.4126H26V22.2459C26 21.8046 25.9611 21.3887 25.8833 20.9982C25.8056 20.6078 25.6778 20.2207 25.5 19.8368C25.7444 19.7985 25.9908 19.7737 26.239 19.7626C26.4873 19.7515 26.741 19.7459 27 19.7459ZM15.9933 19.4126C14.22 19.4126 12.7778 19.6793 11.6667 20.2126C10.5556 20.7459 10 21.4237 10 22.2459V22.4126H22V22.2126C22 21.4126 21.45 20.7459 20.35 20.2126C19.25 19.6793 17.7978 19.4126 15.9933 19.4126Z"
      }
    ],
    class: "fill-yellow-400",
    width: 32,
    height: 33,
    viewBox: "0 0 32 33"
  },
  seguridad: {
    paths: [
      {
        d: "M11.8633 30.4126L9.32996 26.0793L4.29662 25.0459L4.86329 20.1459L1.66329 16.4126L4.86329 12.7126L4.29662 7.8126L9.32996 6.77926L11.8633 2.4126L16.33 4.47926L20.7966 2.4126L23.3633 6.77926L28.3633 7.8126L27.7966 12.7126L30.9966 16.4126L27.7966 20.1459L28.3633 25.0459L23.3633 26.0793L20.7966 30.4126L16.33 28.3459L11.8633 30.4126ZM12.7633 27.7793L16.33 26.2793L19.9966 27.7793L22.23 24.4459L26.13 23.4459L25.73 19.4793L28.43 16.4126L25.73 13.2793L26.13 9.3126L22.23 8.37926L19.93 5.04593L16.33 6.54593L12.6633 5.04593L10.43 8.37926L6.52995 9.3126L6.92996 13.2793L4.22995 16.4126L6.92996 19.4793L6.52995 23.5126L10.43 24.4459L12.7633 27.7793ZM14.8966 20.8459L22.4633 13.3459L20.9633 11.9793L14.8966 17.9793L11.73 14.6793L10.1966 16.1793L14.8966 20.8459Z"
      }
    ],
    width: 32,
    height: 33,
    viewBox: "0 0 32 33",
    class: "fill-yellow-400"
  },
  simple: {
    paths: [
      {
        d: "M11.4333 18.4126H18.9333V16.4126H11.4333V18.4126ZM11.4333 15.4126H24.6V13.4126H11.4333V15.4126ZM11.4333 12.4126H24.6V10.4126H11.4333V12.4126ZM8.66666 25.7459C8.13332 25.7459 7.66666 25.5459 7.26666 25.1459C6.86666 24.7459 6.66666 24.2792 6.66666 23.7459V5.07922C6.66666 4.54589 6.86666 4.07922 7.26666 3.67922C7.66666 3.27922 8.13332 3.07922 8.66666 3.07922H27.3333C27.8667 3.07922 28.3333 3.27922 28.7333 3.67922C29.1333 4.07922 29.3333 4.54589 29.3333 5.07922V23.7459C29.3333 24.2792 29.1333 24.7459 28.7333 25.1459C28.3333 25.5459 27.8667 25.7459 27.3333 25.7459H8.66666ZM8.66666 23.7459H27.3333V5.07922H8.66666V23.7459ZM4.66666 29.7459C4.13332 29.7459 3.66666 29.5459 3.26666 29.1459C2.86666 28.7459 2.66666 28.2792 2.66666 27.7459V7.07922H4.66666V27.7459H25.3333V29.7459H4.66666Z"
      }
    ],
    width: 32,
    height: 33,
    viewBox: "0 0 32 33",
    class: "fill-yellow-400"
  },
  liquidez: {
    paths: [
      {
        d: "M16.33 16.4126C15.1966 16.4126 14.2466 16.0292 13.48 15.2626C12.7133 14.4959 12.33 13.5459 12.33 12.4126C12.33 11.3014 12.7133 10.357 13.48 9.57922C14.2466 8.80145 15.1966 8.41256 16.33 8.41256C17.4411 8.41256 18.3855 8.80145 19.1633 9.57922C19.9411 10.357 20.33 11.3014 20.33 12.4126C20.33 13.5459 19.9411 14.4959 19.1633 15.2626C18.3855 16.0292 17.4411 16.4126 16.33 16.4126ZM16.3183 14.4126C16.8816 14.4126 17.3577 14.222 17.7466 13.8409C18.1355 13.4598 18.33 12.9876 18.33 12.4243C18.33 11.8609 18.1372 11.3848 17.7516 10.9959C17.366 10.607 16.8882 10.4126 16.3183 10.4126C15.7483 10.4126 15.2744 10.6053 14.8966 10.9909C14.5188 11.3765 14.33 11.8543 14.33 12.4243C14.33 12.9942 14.5205 13.4681 14.9016 13.8459C15.2827 14.2237 15.7549 14.4126 16.3183 14.4126ZM8.32996 24.4126V21.8792C8.32996 21.2792 8.5244 20.7514 8.91329 20.2959C9.30218 19.8403 9.7744 19.4681 10.33 19.1792C11.2633 18.6903 12.2293 18.3292 13.2281 18.0959C14.2268 17.8626 15.2601 17.7459 16.3281 17.7459C17.396 17.7459 18.43 17.8626 19.43 18.0959C20.43 18.3292 21.3966 18.6903 22.33 19.1792C22.8855 19.4681 23.3577 19.8403 23.7466 20.2959C24.1355 20.7514 24.33 21.2792 24.33 21.8792V24.4126H8.32996ZM16.33 19.7459C15.2734 19.7459 14.2426 19.8903 13.2375 20.1792C12.2325 20.4681 11.2633 20.9014 10.33 21.4792V22.4126H22.33V21.4792C21.3966 20.9014 20.4274 20.4681 19.4224 20.1792C18.4173 19.8903 17.3865 19.7459 16.33 19.7459ZM16.33 22.4126H22.33H10.33H16.33ZM4.99662 29.7459C4.46329 29.7459 3.99662 29.5459 3.59662 29.1459C3.19662 28.7459 2.99662 28.2792 2.99662 27.7459V22.0126H4.99662V27.7459H10.73V29.7459H4.99662ZM2.99662 10.8126V5.07922C2.99662 4.54589 3.19662 4.07922 3.59662 3.67922C3.99662 3.27922 4.46329 3.07922 4.99662 3.07922H10.73V5.07922H4.99662V10.8126H2.99662ZM21.93 29.7459V27.7459H27.6633V22.0126H29.6633V27.7459C29.6633 28.2792 29.4633 28.7459 29.0633 29.1459C28.6633 29.5459 28.1966 29.7459 27.6633 29.7459H21.93ZM27.6633 10.8126V5.07922H21.93V3.07922H27.6633C28.1966 3.07922 28.6633 3.27922 29.0633 3.67922C29.4633 4.07922 29.6633 4.54589 29.6633 5.07922V10.8126H27.6633Z"
      }
    ],
    width: 32,
    height: 33,
    viewBox: "0 0 32 33",
    class: "fill-yellow-400"
  },
  groups: {
    paths: [
      {
        d: "m150-400 82-80-82-82-80 82 80 80Zm573-10 87-140 88 140H723Zm-243-70q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm.351-180Q455-660 437.5-642.851t-17.5 42.5Q420-575 437.351-557.5t43 17.5Q506-540 523-557.351t17-43Q540-626 522.851-643t-42.5-17ZM480-600ZM0-240v-53q0-39.464 42-63.232T150.398-380q12.158 0 23.38.5T196-377.273q-8 17.273-12 34.842-4 17.57-4 37.431v65H0Zm240 0v-65q0-65 66.5-105T480-450q108 0 174 40t66 105v65H240Zm570-140q67.5 0 108.75 23.768T960-293v53H780v-65q0-19.861-3.5-37.431Q773-360 765-377.273q11-1.727 22.171-2.227 11.172-.5 22.829-.5Zm-330.2-10Q400-390 350-366q-50 24-50 61v5h360v-6q0-36-49.5-60t-130.7-24Zm.2 90Z"
      }
    ],
    class: "mt-1 h-8 w-8 flex-shrink-0 fill-orange-400 dark:fill-orange-300",
    width: 48,
    height: 48,
    viewBox: "0 -960 960 960"
  },
  books: {
    paths: [
      {
        d: "M343-420h225v-60H343v60Zm0-90h395v-60H343v60Zm0-90h395v-60H343v60Zm-83 400q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z"
      }
    ],
    class: "mt-1 h-8 w-8 flex-shrink-0 fill-orange-400 dark:fill-orange-300",
    width: 48,
    height: 48,
    viewBox: "0 -960 960 960"
  },
  verified: {
    paths: [
      {
        d: "m346-60-76-130-151-31 17-147-96-112 96-111-17-147 151-31 76-131 134 62 134-62 77 131 150 31-17 147 96 111-96 112 17 147-150 31-77 130-134-62-134 62Zm27-79 107-45 110 45 67-100 117-30-12-119 81-92-81-94 12-119-117-28-69-100-108 45-110-45-67 100-117 28 12 119-81 94 81 92-12 121 117 28 70 100Zm107-341Zm-43 133 227-225-45-41-182 180-95-99-46 45 141 140Z"
      }
    ],
    class: "mt-1 h-8 w-8 flex-shrink-0 fill-orange-400 dark:fill-orange-300",
    width: 48,
    height: 48,
    viewBox: "0 -960 960 960"
  },
  frame: {
    paths: [
      {
        d: "M480-480q-51 0-85.5-34.5T360-600q0-50 34.5-85t85.5-35q50 0 85 35t35 85q0 51-35 85.5T480-480Zm-.351-60Q505-540 522.5-557.149t17.5-42.5Q540-625 522.649-642.5t-43-17.5Q454-660 437-642.649t-17 43Q420-574 437.149-557t42.5 17ZM240-240v-76q0-27 17.5-47.5T300-397q42-22 86.943-32.5 44.942-10.5 93-10.5Q528-440 573-429.5t87 32.5q25 13 42.5 33.5T720-316v76H240Zm240-140q-47.546 0-92.773 13T300-328v28h360v-28q-42-26-87.227-39-45.227-13-92.773-13Zm0-220Zm0 300h180-360 180ZM140-80q-24 0-42-18t-18-42v-172h60v172h172v60H140ZM80-648v-172q0-24 18-42t42-18h172v60H140v172H80ZM648-80v-60h172v-172h60v172q0 24-18 42t-42 18H648Zm172-568v-172H648v-60h172q24 0 42 18t18 42v172h-60Z"
      }
    ],
    class: "mt-1 h-8 w-8 flex-shrink-0 fill-orange-400 dark:fill-orange-300",
    width: 48,
    height: 48,
    viewBox: "0 -960 960 960"
  },
  tools: {
    paths: [
      {
        d: "M764-80q-6 0-11-2t-10-7L501-331q-5-5-7-10t-2-11q0-6 2-11t7-10l85-85q5-5 10-7t11-2q6 0 11 2t10 7l242 242q5 5 7 10t2 11q0 6-2 11t-7 10l-85 85q-5 5-10 7t-11 2Zm0-72 43-43-200-200-43 43 200 200ZM195-80q-6 0-11.5-2T173-89l-84-84q-5-5-7-10.5T80-195q0-6 2-11t7-10l225-225h85l38-38-175-175h-57L80-779l99-99 125 125v57l175 175 130-130-67-67 56-56H485l-18-18 128-128 18 18v113l56-56 169 169q15 15 23.5 34.5T870-600q0 20-6.5 38.5T845-528l-85-85-56 56-52-52-211 211v84L216-89q-5 5-10 7t-11 2Zm0-72 200-200v-43h-43L152-195l43 43Zm0 0-43-43 22 21 21 22Zm569 0 43-43-43 43Z"
      }
    ],
    class: "mt-2 h-6 w-6 flex-shrink-0 fill-neutral-700 dark:fill-white hs-tab-active:fill-yellow-500 dark:hs-tab-active:fill-yellow-500 md:h-7 md:w-7",
    width: 48,
    height: 48,
    viewBox: "0 -960 960 960"
  },
  dashboard: {
    paths: [
      {
        d: "M510-570v-270h330v270H510ZM120-450v-390h330v390H120Zm390 330v-390h330v390H510Zm-390 0v-270h330v270H120Zm60-390h210v-270H180v270Zm390 330h210v-270H570v270Zm0-450h210v-150H570v150ZM180-180h210v-150H180v150Zm210-330Zm180-120Zm0 180ZM390-330Z"
      }
    ],
    class: "mt-2 h-6 w-6 flex-shrink-0 fill-neutral-700 dark:fill-white hs-tab-active:fill-yellow-500 dark:hs-tab-active:fill-yellow-500 md:h-7 md:w-7",
    width: 48,
    height: 48,
    viewBox: "0 -960 960 960"
  },
  house: {
    paths: [
      {
        d: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
      }
    ],
    class: "h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-white hs-tab-active:text-yellow-500 dark:hs-tab-active:text-yellow-500 md:h-7 md:w-7",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  arrowUp: {
    paths: [
      {
        d: "m5 12 7-7 7 7"
      },
      {
        d: "M12 19V5"
      }
    ],
    class: "h-5 w-5 flex-shrink-0 text-orange-400 dark:text-orange-300",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  checkCircle: {
    paths: [
      {
        d: "M10 18a8 8 0 100-16 8 8 0 000 16zM13.707 8.293a1 1 0 00-1.414-1.414L9 10.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      }
    ],
    class: "h-5 w-5 shrink-0",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    fillRule: "evenodd",
    clipRule: "evenodd"
  },
  bookmark: {
    paths: [
      {
        d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z",
        class: "fill-current text-neutral-500 transition duration-300 group-hover:text-red-400 group-hover:dark:text-red-400"
      }
    ],
    class: "h-6 w-6 fill-none transition duration-300",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  arrowRight: {
    paths: [
      {
        d: "m9 18 6-6-6-6"
      }
    ],
    class: "h-4 w-4 flex-shrink-0 transition duration-300 group-hover:translate-x-1",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  facebook: {
    paths: [
      {
        d: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
      }
    ],
    class: "size-4 flex-shrink-0 fill-current",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  },
  x: {
    paths: [
      {
        d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      }
    ],
    class: "size-4 flex-shrink-0 fill-current",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  },
  linkedIn: {
    paths: [
      {
        d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      }
    ],
    class: "size-4 flex-shrink-0 fill-current",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  },
  share: {
    paths: [
      {
        d: "M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
      }
    ],
    class: "h-4 w-4 group-hover:text-neutral-700",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  github: {
    paths: [
      {
        d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      }
    ],
    class: "w-4.5 h-4.5 transition flex-shrink-0 text-neutral-700 duration-300 group-hover:-translate-y-1",
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "currentColor"
  },
  arrowRightStatic: {
    paths: [
      {
        d: "m9 18 6-6-6-6"
      }
    ],
    class: "size-4 flex-shrink-0",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  openInNew: {
    paths: [
      {
        d: "m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      }
    ],
    class: "ml-0.5 w-3 h-3 md:w-4 md:h-4 inline pb-0.5",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  accordionNotActive: {
    paths: [
      {
        d: "m6 9 6 6 6-6"
      }
    ],
    class: "block h-5 w-5 flex-shrink-0 text-neutral-600 group-hover:text-neutral-500 hs-accordion-active:hidden dark:text-neutral-400",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  accordionActive: {
    paths: [
      {
        d: "m18 15-6-6-6 6"
      }
    ],
    class: "hidden h-5 w-5 flex-shrink-0 text-neutral-600 group-hover:text-neutral-500 hs-accordion-active:block dark:text-neutral-400",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  xFooter: {
    paths: [
      {
        d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      }
    ],
    class: "h-4 w-4 flex-shrink-0 fill-current text-neutral-700 dark:text-neutral-400",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    title: "Twitter"
  },
  facebookFooter: {
    paths: [
      {
        d: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
      }
    ],
    class: "h-4 w-4 flex-shrink-0 fill-current text-neutral-700 dark:text-neutral-400",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    title: "Facebook"
  },
  instagramFooter: {
    paths: [
      {
        d: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
      }
    ],
    class: "h-4 w-4 flex-shrink-0 fill-current text-neutral-700 dark:text-neutral-400",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    title: "Instagram"
  },
  tiktokFooter: {
    paths: [
      {
        d: "M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z",
        fill: "currentColor"
      }
    ],
    class: "h-4 w-4 flex-shrink-0 fill-current text-neutral-700 dark:text-neutral-400",
    viewBox: "0 0 448 512",
    fill: "currentColor",
    title: "Tiktok"
  },
  quotation: {
    paths: [
      {
        d: "M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
      }
    ],
    class: "absolute start-0 top-0 h-16 w-16 -translate-x-6 -translate-y-8 transform text-neutral-300 dark:text-neutral-700",
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "currentColor"
  },
  question: {
    paths: [
      {
        d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
      }
    ],
    class: "mt-1.5 h-6 w-6 flex-shrink-0 text-neutral-600 dark:text-neutral-400",
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  chatBubble: {
    paths: [
      {
        d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
      }
    ],
    class: "mt-1.5 h-6 w-6 flex-shrink-0 text-neutral-600 dark:text-neutral-400",
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  mapPin: {
    paths: [
      {
        d: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      },
      {
        d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      }
    ],
    class: "mt-1.5 h-6 w-6 flex-shrink-0 text-neutral-600 dark:text-neutral-400",
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  envelopeOpen: {
    paths: [
      {
        d: "M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
      }
    ],
    class: "mt-1.5 h-6 w-6 flex-shrink-0 text-neutral-600 dark:text-neutral-400",
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  earth: {
    paths: [
      {
        d: "m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
      }
    ],
    class: "w-4 h-4 flex-shrink-0",
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  },
  calculator: {
    paths: [
      {
        d: "M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
      },
      {
        d: "M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"
      }
    ],
    class: "mt-1 h-6 w-6 flex-shrink-0 fill-[#000000] dark:fill-[#C9AF68]",
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "currentColor"
  }
};

const $$Astro$1 = createAstro("https://sinergia&valores");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Icon;
  const { name } = Astro2.props;
  let icon = Icons[name] || {};
  let paths = icon.paths || [];
  return renderTemplate`${icon ? renderTemplate`${maybeRenderHead()}<svg${addAttribute(icon.class, "class")}${addAttribute(icon.height, "height")}${addAttribute(icon.viewBox, "viewBox")}${addAttribute(icon.width, "width")}${addAttribute(icon.fill, "fill")}${addAttribute(icon.clipRule, "clip-rule")}${addAttribute(icon.fillRule, "fill-rule")}${addAttribute(icon.stroke, "stroke")}${addAttribute(icon.strokeWidth, "stroke-width")}${addAttribute(icon.strokeLinecap, "stroke-linecap")}${addAttribute(icon.strokeLinejoin, "stroke-linejoin")}><title>${icon.title}</title>${paths.map((path) => renderTemplate`<path${addAttribute(path.d, "d")}${addAttribute(path.class || "", "class")}></path>`)}</svg>` : "Icon not found"}`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/icons/Icon.astro", void 0);

const $$Astro = createAstro("https://sinergia&valores");
const $$Btn404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Btn404;
  const { title, id, noArrow } = Astro2.props;
  const baseClasses = "group inline-flex items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-bold text-neutral-50 ring-zinc-500 transition duration-300 focus-visible:ring outline-none";
  const borderClasses = "border border-transparent";
  const bgColorClasses = "bg-yellow-500 hover:bg-yellow-500 active:bg-yellow-500 dark:focus:outline-none";
  const disableClasses = "disabled:pointer-events-none disabled:opacity-50";
  const fontSizeClasses = "2xl:text-base";
  const ringClasses = "dark:ring-zinc-200";
  return renderTemplate`<!-- Button with dynamic title, id, and optional arrow -->${maybeRenderHead()}<button${addAttribute(`${baseClasses} ${borderClasses} ${bgColorClasses} ${disableClasses} ${fontSizeClasses} ${ringClasses}`, "class")}${addAttribute(id, "id")}> ${title} <!-- Display the arrow based on the 'noArrow' property --> ${noArrow ? null : renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "arrowRight" })}`} </button>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/buttons/Btn404.astro", void 0);

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = `Page Not Found | ${SITE.title}`;
  const title = "404";
  const subTitle = "Este no es el camino correcto!";
  const btnTitle = "Volver";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="grid h-svh place-content-center"> <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16"> <div class="mx-auto max-w-screen-sm text-center"> <h1 class="text-dark mb-4 text-7xl font-extrabold text-yellow-500 dark:text-yellow-400 lg:text-9xl"> ${title} </h1> <p class="mb-4 text-balance text-3xl font-bold tracking-tight text-neutral-700 dark:text-neutral-300 md:text-4xl"> ${subTitle} </p> <!-- <p
          class="mb-4 text-pretty text-lg text-neutral-600 dark:text-neutral-400"
        >
          {content}
        </p> --> <!--Display a button that navigates user back to the previous page--> ${renderComponent($$result2, "Btn404", $$Btn404, { "title": btnTitle, "id": "go-back" })} </div> </div> </section> ` })} <!--JavaScript code that adds click event to the Button, resulting in going back to the previous page in history--> ${renderScript($$result, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/404.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/404.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$MainLayout as $, ArrepentimientoFormInfo as A, SITE as S, _404 as _, $$Icon as a, $$Image as b, getConfiguredImageService as c, imageConfig as d, assetsDir as e, getImage as g, icon as i, outDir as o, questionsFrecuentes as q };
