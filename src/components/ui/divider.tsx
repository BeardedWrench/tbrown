interface DividerProps {
  vertical?: boolean;
  faded?: boolean;
}

export function Divider({ vertical = false, faded = true }: DividerProps) {
  const getStyle = () => {
    if (vertical && faded) {
      return (
        <div className="h-[250px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
      );
    }
    if (vertical && !faded) {
      return (
        <div className="inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
      );
    }
    if (!vertical && faded) {
      return (
        <hr className="my-12 h-1 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      );
    }
    if (!vertical && !faded) {
      return (
        <hr className="my-12 h-1 border-t-0 bg-neutral-200 dark:bg-white/10" />
      );
    }
  };
  return getStyle();
}
