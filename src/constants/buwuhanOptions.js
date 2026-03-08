export const CATEGORY_OPTIONS = [
  { id: 2, value: "rice", label: "Beras" },
  { id: 1, value: "money", label: "Uang" },
  { id: 3, value: "items", label: "Barang" },
  { id: 4, value: "other", label: "Lainnya" }
];

export const STATUS_OPTIONS = [
  { value: "paid", label: "Lunas" },
  { value: "unpaid", label: "Belum Lunas" }
];

// Detail Buwuhan
export const getCategoryLabelById = (id) => {
  const numericId = Number(id);
  return CATEGORY_OPTIONS.find((c) => c.id === numericId)?.label || "";
  
};

// List Buwuhan
export const getCategoryLabelByName = (name) => {
  return CATEGORY_OPTIONS.find(
    (c) => c.value.toLowerCase() === name?.toLowerCase()
  )?.label || name;
};

export const getStatusLabel = (value) => {
  return STATUS_OPTIONS.find(
    (s) => s.value.toLowerCase() === value?.toLowerCase()
  )?.label || value;
};