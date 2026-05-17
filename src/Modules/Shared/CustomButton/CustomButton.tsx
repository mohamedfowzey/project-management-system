interface Props {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function CustomButton({
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
        className={`main-Bg-btn w-full p-2 mt-4 rounded-full ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
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
