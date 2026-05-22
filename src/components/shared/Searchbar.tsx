import type { SearchBarProps } from "../../interfaces/Interfacecomponents"

function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder,
  buttonText,
}: SearchBarProps) {
  return (
    <div className="search-box">
      <input
        className="search-input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch()
          }
        }}
      />

      <button type="button" className="search-btn" onClick={onSearch}>
        {buttonText}
      </button>
    </div>
  )
}

export default SearchBar