import "../styles/Animation.css";

export default function ProjectTile({ projName, projDesc }) {
  return (
    <div className="flex flex-col w-60 h-60 border-4 p-4 rounded-2xl border-highlight2 hover:bg-highlight1 appearAnimation enlargeOnHover">
      <p className="text-3xl">{projName}</p>
      <br />
      <p>{projDesc}</p>
    </div>
  );
}
