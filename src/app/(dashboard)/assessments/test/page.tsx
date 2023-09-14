import { ComboboxDemo } from "./ComboBox";
import { Multiselect } from "~/components/ui/Multiselect";

export default function Home() {
  return (
    <main className="space-y-6 p-4">
      <div>
        <h1>Example search terms:</h1>
        <ul>
          <li>iphone</li>
          <li>samsung</li>
          <li>perfume</li>
        </ul>
      </div>

      <div>
        <ComboboxDemo />
        {/* <Multiselect /> */}
      </div>
    </main>
  );
}
