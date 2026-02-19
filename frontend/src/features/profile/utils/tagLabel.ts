import {
  ART_FIELD_LABEL,
  ART_STYLE_LABEL,
  type ArtField,
  type ArtStyle,
} from "../../../apis/types/common";

const hasOwn = Object.prototype.hasOwnProperty;

const isArtField = (value: string): value is ArtField =>
  hasOwn.call(ART_FIELD_LABEL, value);

const isArtStyle = (value: string): value is ArtStyle =>
  hasOwn.call(ART_STYLE_LABEL, value);

export const toKoreanTagLabel = (tag: string): string => {
  const normalized = tag.trim().toUpperCase();

  if (isArtField(normalized)) return ART_FIELD_LABEL[normalized];
  if (isArtStyle(normalized)) return ART_STYLE_LABEL[normalized];

  return tag;
};

