import { motion } from "framer-motion";

function Button({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
  type = "button",
  ...props
}) {
  const variantClass =
    variant === "outline" ? "button button-outline" : "button button-primary";
  const classes = [variantClass, className].filter(Boolean).join(" ");

  const motionProps = {
    className: classes,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
    ...props,
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  );
}

export default Button;
