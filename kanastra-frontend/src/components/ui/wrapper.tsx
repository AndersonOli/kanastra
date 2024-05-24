type WrapperProps = {
  children: JSX.Element;
};

const Wrapper = ({ children }: WrapperProps) => {
  return <div className="container p-10">{children}</div>;
};

export default Wrapper;
