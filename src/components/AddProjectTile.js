import "../styles/Animation.css";
export default function AddProjectTile() {
  return (
    <div className="flex flex-col w-60 h-60 border-4 p-4  rounded-2xl border-highlight2 hover:bg-highlight1 appearAnimation enlargeOnHover">
      <div className="m-auto">
        <p className="text-9xl">+</p>
      </div>
    </div>
  );
}
