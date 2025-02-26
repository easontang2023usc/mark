export const AceternityIcon = () => {
    return (
      <svg width="66" height="65" viewBox="0 0 66 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white ">
        <path d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696" stroke="currentColor" strokeWidth="15" strokeMiterlimit="3.86874" strokeLinecap="round" />
      </svg>
    );
  };
  
  export const Icon = ({ className, ...rest }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} {...rest}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>;
  };