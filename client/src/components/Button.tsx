type ButtonProps = {
  caption: string;
  clickHandler: () => void;
};

export default function Button({ caption, clickHandler }: ButtonProps) {
  return (
    <button
      className="border border-slate-600 text-xs text-slate-600 px-2 py-1 rounded hover:bg-slate-500 hover:text-slate-700 focus-within:bg-slate-500 focus-within:text-slate-100 outline-none"
      onClick={clickHandler}
    >
      {caption}
    </button>
  );
}
