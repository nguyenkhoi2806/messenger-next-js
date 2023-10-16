'use client';

import Modal from '@/app/components/Modal';
import Image from 'next/image';

interface ImageModalProps {
  src?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = (props: ImageModalProps) => {
  const { src, isOpen, onClose } = props;

  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image alt="Image" className="object-cover" src={src} fill />
      </div>
    </Modal>
  );
};

export default ImageModal;
