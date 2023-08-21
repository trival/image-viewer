import CreateLibraryForm from "~/components/fragments/CreateLibraryForm"

export default function CreateLibraryFormTest() {
	return <CreateLibraryForm onCreate={(input) => console.log(input)} />
}
