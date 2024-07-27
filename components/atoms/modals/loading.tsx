import ModalContainer from "@/components/modal-container";
import Image from "next/image";


interface LoadingModalProps {
  show: boolean;
  handleClose: () => void;
  icon?: string;
  title?: string;
  message?: string;
}

export default function LoadingModal({ show, handleClose, icon, title, message }: LoadingModalProps) {
  return (
    <ModalContainer
      show={show}
      handleClose={handleClose}
      modalClass="rounded-[.5rem] md:w-[10.8rem] md:max-w-[8.8rem] lg:w-[10.5rem] lg:max-w-[8.5rem]"
    >
      <section>
        <div className="">
          <div className="text-center mb-5">
            <div className="flex justify-center">
              <Image
                src="/assets/images/loading.gif"
                width={92}
                height={92}
                alt="loading spinner"
              />
            </div>
            {title && <h3 className="text-isGray900 text-2xl font-bold leading-9 w-1/2 mx-auto">{title}</h3>}
          {message && <p className="text- w-4/5 mx-auto mt-3 text-white">{message}</p>}
          </div>
        </div>
      </section>
    </ModalContainer>
  );
}
