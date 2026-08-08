import {
  hid_usage_get_labels,
  hid_usage_get_zh_label,
  hid_usage_page_and_id_from_usage,
} from "../hid-usages";

export interface HidUsageLabelProps {
  hid_usage: number;
}

function remove_prefix(s?: string) {
  return s?.replace(/^Keyboard /, "");
}

export const HidUsageLabel = ({ hid_usage }: HidUsageLabelProps) => {
  let [page, id] = hid_usage_page_and_id_from_usage(hid_usage);

  // TODO: Do something with implicit mods!
  page &= 0xff;

  let labels = hid_usage_get_labels(page, id);
  let zh = hid_usage_get_zh_label(page, id);

  return (
    <span className="flex flex-col items-center leading-tight">
      <span>{remove_prefix(labels.short)}</span>
      {zh && <span className="text-[0.65em] opacity-60">{zh}</span>}
    </span>
  );
};