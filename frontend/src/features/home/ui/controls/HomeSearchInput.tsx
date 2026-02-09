import { SearchField } from "../../../../components/common";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const HomeSearchInput = ({ value, onChange, onSearch }: Props) => {
  return (
    <SearchField
      value={value}
      onChange={onChange}
      placeholder="원하는 해시태그를 입력해주세요"
      customSize="large"
      icon="search"
      iconPosition="trailing"
      className="w-[405px] shrink-0"
      onSearch={onSearch}
    />
  );
};

export default HomeSearchInput;