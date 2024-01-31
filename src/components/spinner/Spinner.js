const Spinner = () => {
    return (
        <svg xmlnssvg="http://www.w3.org/2000/svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.0"
            width="64px"
            height="64px"
            viewBox="0 0 128 128"
            xmlSpace="preserve"
            style={{margin: '0 auto', background: 'none', display: 'block'}}>
                <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
                <g>
                    <path
                    d="M97.63 8.23a7.38 7.38 0 0 1 2.7 10.07L89.2 37.57a7.38 7.38 0 1 1-12.77-7.37l11.12-19.27a7.38 7.38 0 0 1 10.08-2.7z"
                    fill="#000000"
                    />
                    <path
                    d="M97.63 8.23a7.38 7.38 0 0 1 2.7 10.07L89.2 37.57a7.38 7.38 0 1 1-12.77-7.37l11.12-19.27a7.38 7.38 0 0 1 10.08-2.7z"
                    fill="#e5e5e5"
                    transform="rotate(30 64 64)"
                    />
                    <path
                    d="M97.63 8.23a7.38 7.38 0 0 1 2.7 10.07L89.2 37.57a7.38 7.38 0 1 1-12.77-7.37l11.12-19.27a7.38 7.38 0 0 1 10.08-2.7z"
                    fill="#e5e5e5"
                    transform="rotate(60 64 64)"
                    />
                    <path
                    d="M97.63 8.23a7.38 7.38 0 0 1 2.7 10.07L89.2 37.57a7.38 7.38 0 1 1-12.77-7.37l11.12-19.27a7.38 7.38 0 0 1 10.08-2.7z"
                    fill="#e5e5e5"
                    transform="rotate(90 64 64)"
                    />
                    <path
                    d="M97.63 8.23a7.38 7.38 0 0 1 2.7 10.07L89.2 37.57a7.38 7.38 0 1 1-12.77-7.37l11.12-19.27a7.38 7.38 0 0 1 10.08-2.7z"
                    fill="#cecece"
                    transform="rotate(120 64 64)"
                    />
                    <path
                    d="M97.63 8.23a7.38 7.38 0 0 1 2.7 10.07L89.2 37.57a7.38 7.38 0 1 1-12.77-7.37l11.12-19.27a7.38 7.38 0 0 1 10.08-2.7z"
                    fill="#b7b7b7"
                    transform="rotate(150 64 64)"
                    />
                    <path
                    d="M97.63 8.23a7.38 7.38 0 0 1 2.7 10.07L89.2 37.57a7.38 7.38 0 1 1-12.77-7.37l11.12-19.27a7.38 7.38 0 0 1 10.08-2.7z"
                    fill="#9f9f9f"
                    transform="rotate(180 64 64)"
                    />
                    <path
                    d="M97.63 8.23a7.38 7.38 0 0 1 2.7 10.07L89.2 37.57a7.38 7.38 0 1 1-12.77-7.37l11.12-19.27a7.38 7.38 0 0 1 10.08-2.7z"
                    fill="#898989"
                    transform="rotate(210 64 64)"
                    />
                    <path
                    d="M97.63 8.23a7.38 7.38 0 0 1 2.7 10.07L89.2 37.57a7.38 7.38 0 1 1-12.77-7.37l11.12-19.27a7.38 7.38 0 0 1 10.08-2.7z"
                    fill="#727272"
                    transform="rotate(240 64 64)"
                    />
                    <path
                    d="M97.63 8.23a7.38 7.38 0 0 1 2.7 10.07L89.2 37.57a7.38 7.38 0 1 1-12.77-7.37l11.12-19.27a7.38 7.38 0 0 1 10.08-2.7z"
                    fill="#5c5c5c"
                    transform="rotate(270 64 64)"
                    />
                    <path
                    d="M97.63 8.23a7.38 7.38 0 0 1 2.7 10.07L89.2 37.57a7.38 7.38 0 1 1-12.77-7.37l11.12-19.27a7.38 7.38 0 0 1 10.08-2.7z"
                    fill="#444444"
                    transform="rotate(300 64 64)"
                    />
                    <path
                    d="M97.63 8.23a7.38 7.38 0 0 1 2.7 10.07L89.2 37.57a7.38 7.38 0 1 1-12.77-7.37l11.12-19.27a7.38 7.38 0 0 1 10.08-2.7z"
                    fill="#2e2e2e"
                    transform="rotate(330 64 64)"
                    />
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64"
                        calcMode="discrete"
                        dur="1080ms"
                        repeatCount="indefinite"
                    ></animateTransform>
                </g>
        </svg>
  );
}

export default Spinner;
