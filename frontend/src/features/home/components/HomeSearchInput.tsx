import { SearchField } from "../../../components/common";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const HomeSearchInput = ({ value, onChange }: Props) => {
  return (
    <SearchField
      value={value}
      onChange={onChange}
      placeholder="원하는 해시태그를 입력해주세요"
      customSize="large"
      icon="search"
      iconPosition="trailing"
      className="w-full max-w-[405px] text-primary"
      onSearch={() => {}}
    />
  );
};

export default HomeSearchInput;
