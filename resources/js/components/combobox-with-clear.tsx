import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "./ui/combobox";

export default function ComboboxWithClear({ name, data, field } : { name: string, data: any, field: any }) {
  return (
    <Combobox items={data} defaultValue={field.state.value}>
      <ComboboxInput placeholder={`Select a ${name.toLowerCase()}`} showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.name} value={item.id} onSelect={(value) => {
                field.handleChange(value);
            }}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}