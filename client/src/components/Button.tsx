type BtnProps = {
  caption: string;
  clickHandler: () => void;
};

function Btn({ caption, clickHandler }: BtnProps) {
  return (
    <button
      className="border border-slate-600 text-xs text-slate-600 px-2 py-1 rounded hover:bg-slate-500 hover:text-slate-700 outline-none"
      onClick={clickHandler}
    >
      {caption}
    </button>
  );
}

type ButtonProps = {
  socketIsConnected: boolean;
  connect: () => void;
  disconnect: () => void;
};

export default function Button({
  socketIsConnected,
  connect,
  disconnect,
}: ButtonProps) {
  return (
    <section className="flex w-96 justify-end p-4 py-5 absolute top-0 -right-3">
      {socketIsConnected ? (
        <Btn clickHandler={disconnect} caption="Disconnect" />
      ) : (
        <Btn clickHandler={connect} caption="Connect" />
      )}
    </section>
  );
}
