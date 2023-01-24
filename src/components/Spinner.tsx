import { CgSpinner } from 'react-icons/cg';

interface ISpinnerProps {
  page?: boolean;
}

const Spinner = ({
  page = false,
}: ISpinnerProps) => {
  if (!page) {
    return <CgSpinner className='animate-spin' />
  }

  return (
    <div className='flex justify-center items-center text-6xl w-full pt-40 pb-40'>
      <CgSpinner className='animate-spin' />
    </div>
  );
}

export default Spinner;
