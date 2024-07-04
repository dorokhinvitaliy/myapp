export function ArrowIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}
        >
            <path d="M11.293 17.293l1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" />
        </svg>
    );
}

export function CloseOutlineIcon(props) {
    return (
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        
        {...props}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={32}
          d="M368 368L144 144M368 144L144 368"
        />
      </svg>
    );
  }