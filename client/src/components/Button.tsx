type ButtonProps = {
  caption: string;
  clickHandler: () => void;
};

export default function Button({ caption, clickHandler }: ButtonProps) {
  return (
    <button
      className="border border-slate-300 text-sm text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      onClick={clickHandler}
    >
      {caption}
    </button>
  );
}
