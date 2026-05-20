interface Props {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  bg?:string
}

export default function CustomButton({
  bg = 'main-Bg-btn',
  text,
  loading,
  disabled,
  onClick,
}: Props) {
  return (
    <>
      <button
        type="submit"
        disabled={loading || disabled}
        onClick={onClick}
        className={`${bg} text-white w-full p-2 px-4 mt-4 rounded-full ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      >
        {loading ? (
          <>
            <span> loading...</span>
          </>
        ) : (
          text
        )}
      </button>
    </>
  );
}
