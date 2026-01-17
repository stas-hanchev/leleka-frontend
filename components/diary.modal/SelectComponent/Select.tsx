import Select, {
  Props,
  components,
  GroupBase,
  StylesConfig,
} from 'react-select';

interface CustomSelectProps<Option, IsMulti extends boolean = false>
  extends Props<Option, IsMulti, GroupBase<Option>> {
  hasError?: boolean;
}

const selectStyles = <Option, IsMulti extends boolean>(
  hasError?: boolean
): StylesConfig<Option, IsMulti, GroupBase<Option>> => ({
  container: (base) => ({
    ...base,
    zIndex: 8,
    fontSize: '14px',
  }),

  control: (base, { menuIsOpen, isFocused }) => ({
    ...base,
    padding: '7px 12px',
    backgroundColor: '#f2f2f2',
    borderRadius: menuIsOpen ? '12px 12px 0 0' : '12px',
    borderColor: hasError
      ? '#c60000'
      : menuIsOpen
      ? 'rgba(0, 0, 0, 0.15)'
      : 'transparent',
    boxShadow: isFocused ? 'inset 0 0 0 2px #ffdae0' : 'none',
    minHeight: '42px',
  }),

  placeholder: (base) => ({
    ...base,
    color: hasError ? '#c60000' : '#7f7f7f',
  }),

  valueContainer: (base) => ({
    ...base,
    gap: 10,
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '100px',
    padding: '5px 10px',
  }),

  multiValueRemove: () => ({
    display: 'none',
  }),

  menu: (base) => ({
    ...base,
    background: '#f2f2f2',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    borderTop: 'none',
    borderRadius: '0 0 12px 12px',
    overflow: 'hidden',
  }),

  menuList: (base) => ({
    ...base,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '8px 0',
  }),

  option: (base, { isSelected }) => ({
    ...base,
    padding: '7px 12px',
    backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
    cursor: 'pointer',
    borderRadius: '8px',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  }),
});

function Checkbox({ isChecked }: { isChecked: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path
        d="M15 0.5C17.4853 0.5 19.5 2.51472 19.5 5V15C19.5 17.4853 17.4853 19.5 15 19.5H5C2.51472 19.5 0.5 17.4853 0.5 15V5C0.5 2.51472 2.51472 0.5 5 0.5H15Z"
        fill={isChecked ? '#000' : 'rgba(0,0,0,0.05)'}
      />
      {isChecked && (
        <path
          d="M7.57 12.65L4.37 9.45L3 10.83L7.57 15.4L17 5.97L15.63 4.6L7.57 12.65Z"
          fill="white"
        />
      )}
    </svg>
  );
}

export default function CustomSelect<
  Option,
  IsMulti extends boolean = false>({ hasError, ...props }: CustomSelectProps<Option, IsMulti>) {
  return (
    <Select<Option, IsMulti, GroupBase<Option>>
      {...props}
      closeMenuOnSelect={!props.isMulti}
      hideSelectedOptions={false}
      backspaceRemovesValue={false}
      maxMenuHeight={220}
      isClearable={false}
      isSearchable={false}
      unstyled
      components={{
        DropdownIndicator: (indicatorProps) => (
          <components.DropdownIndicator {...indicatorProps}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                transform: indicatorProps.selectProps.menuIsOpen
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)',
                transition: 'transform 0.1s ease',
              }}
            >
              <path
                d="M12.0008 15.2019C11.8888 15.2019 11.7832 15.1813 11.684 15.1399C11.5847 15.0986 11.4894 15.0323 11.398 14.9409L6.45402 9.99694C6.28402 9.82694 6.20319 9.62385 6.21152 9.38769C6.21985 9.15152 6.30902 8.94844 6.47902 8.77844C6.64902 8.60844 6.85211 8.52344 7.08827 8.52344C7.32444 8.52344 7.52752 8.60844 7.69752 8.77844L12.0008 13.1067L16.329 8.77844C16.499 8.60844 16.6979 8.5276 16.9258 8.53594C17.1536 8.54427 17.3525 8.63344 17.5225 8.80344C17.6925 8.97344 17.7775 9.17652 17.7775 9.41269C17.7775 9.64885 17.6925 9.85194 17.5225 10.0219L12.6035 14.9409C12.5122 15.0323 12.4169 15.0986 12.3175 15.1399C12.2184 15.1813 12.1128 15.2019 12.0008 15.2019Z"
                fill="black"
                fillOpacity="0.6"
              />
            </svg>
          </components.DropdownIndicator>
        ),

        Option: (optionProps) => (
          <components.Option<Option, IsMulti, GroupBase<Option>> {...optionProps}>
            {props.isMulti && <Checkbox isChecked={optionProps.isSelected} />}
            <span>{optionProps.label}</span>
          </components.Option>
        ),
      }}
      styles={selectStyles<Option, IsMulti>(hasError)}
    />
  );
}
