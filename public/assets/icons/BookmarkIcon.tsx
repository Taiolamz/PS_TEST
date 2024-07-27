const BookmarkIcon = ({ className, strokeClassName }: IconPropType) => (
  <svg
    width="15"
    height="18"
    viewBox="0 0 15 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    // className={className}
    style={{ translate: "6px" }}
  >
    <mask
      id="mask0_8557_86637"
      //   style="mask-type:luminance"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="15"
      height="18"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 0H14.0588V17.2008H0V0Z"
        fill="white"
        className={className}
      />
    </mask>
    <g mask="url(#mask0_8557_86637)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.40775 1.23767C2.30455 1.23767 1.23769 2.04792 1.23769 3.6478V15.7967C1.23769 15.8742 1.28225 15.9163 1.31938 15.9378C1.3565 15.9609 1.41509 15.9774 1.48275 15.9394L6.74858 12.9855C6.93671 12.8808 7.16691 12.8799 7.35586 12.9864L12.5763 15.9353C12.6448 15.9749 12.7034 15.9568 12.7405 15.9345C12.7776 15.9122 12.8214 15.8701 12.8214 15.7926V3.7988C12.8214 3.16594 12.8214 1.23767 9.65461 1.23767H4.40775ZM1.40186 17.201C1.15845 17.201 0.915044 17.1358 0.693915 17.0055C0.259084 16.7522 0 16.2992 0 15.7967V3.6478C0 1.32925 1.60648 0 4.40772 0H9.65458C12.4533 0 14.059 1.38536 14.059 3.7988V15.7926C14.059 16.2959 13.7999 16.7489 13.3643 17.0022C12.9303 17.2563 12.4071 17.2613 11.9682 17.0137L7.05054 14.2356L2.08752 17.0195C1.87299 17.14 1.63784 17.201 1.40186 17.201Z"
        fill="white"
        // fill-opacity="0.5"
        className={className}
      />
    </g>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.0163 6.78942H3.97821C3.63661 6.78942 3.35938 6.51218 3.35938 6.17059C3.35938 5.82899 3.63661 5.55176 3.97821 5.55176H10.0163C10.3579 5.55176 10.6352 5.82899 10.6352 6.17059C10.6352 6.51218 10.3579 6.78942 10.0163 6.78942Z"
      fill="white"
      // fill-opacity="0.5"
      className={className}
    />
  </svg>
);
export default BookmarkIcon;
