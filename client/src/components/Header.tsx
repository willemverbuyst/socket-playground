type HeaderProps = {
  socketIsConnected: boolean;
  text: string;
};

export default function Header({ socketIsConnected, text }: HeaderProps) {
  return (
    <section className="flex w-96 justify-center p-4 py-5">
      <p className="text-xl">{`${text} ${socketIsConnected ? "✅" : "❎"}`}</p>
    </section>
  );
}
