import useStyles from "./navbar.style";
import NavBararLeft from "./NavBarLeft";
import NavBarRight from "./NavBarRight";

const Navbar = () => {
  const { styles, theme } = useStyles();

  return (
    <div className={styles.wrapper}>
      <NavBararLeft />
      <NavBarRight />
    </div>
  );
};

export default Navbar;
