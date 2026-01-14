import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type ModalLinkProps = LinkProps & {
  onNavigate: () => void;
  children: ReactNode;
  className?: string;
};

export function ModalLink({
  onNavigate,
  children,
  ...props
}: ModalLinkProps) {
  return (
    <Link
      {...props}
      onClick={() => {
        onNavigate();
      }}
    >
      {children}
    </Link>
  );
}
