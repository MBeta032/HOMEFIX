import Button from "./Button";

interface SearchBoxProps {
  value: string;
  placeholder: string;
  buttonText: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

function SearchBox({
  value,
  placeholder,
  buttonText,
  onChange,
  onSearch,
}: SearchBoxProps) {
  return (
    <div className="home-search-box">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSearch();
          }
        }}
      />

      <Button text={buttonText} onClick={onSearch} variant="primary" />
    </div>
  );
}

export default SearchBox;