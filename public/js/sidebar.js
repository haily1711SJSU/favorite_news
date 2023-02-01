const section_selector = document.querySelector("#section_select");

// section name selectors for advanced search form
const section_names = [
  "Arts",
  "Automobiles",
  "Books",
  "Education",
  "Food",
  "Movies",
  "World",
  "Travel",
  "World",
];

// create selector for section names
for (names of section_names) {
  const select_name = document.createElement("option");
  select_name.value = names.toLowerCase();
  select_name.innerHTML = names;
  section_selector.append(select_name);
}