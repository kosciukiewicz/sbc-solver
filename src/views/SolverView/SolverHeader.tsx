import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { IoFootball } from "react-icons/io5";
import { AiOutlineClear, AiFillQuestionCircle } from "react-icons/ai";

import { useSolverView } from "./SolverView.hooks";
import React from "react";

interface SolverHeaderProps {
  onCollapseClick: () => void;
}

export const SolverHeader: React.FC<SolverHeaderProps> = (
  props: SolverHeaderProps,
) => {
  const { clearState } = useSolverView();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="m-4 inline-block flex items-center justify-between">
      <div
        className="flex cursor-pointer items-center space-x-2"
        onClick={() => props.onCollapseClick()}
      >
        <IoFootball className="text-2xl" />{" "}
        <a className="text-2xl font-medium">SBC Solver</a>
      </div>
      <div className="flex space-x-2">
        <Tooltip className="text-gray-700" content={"How it works?"}>
          <Button
            isIconOnly
            color="primary"
            aria-label="Clear"
            onClick={() => onOpen()}
          >
            <AiFillQuestionCircle className="text-2xl" />
          </Button>
        </Tooltip>

        <Tooltip className="text-gray-700" content={"Clear solver state"}>
          <Button
            isIconOnly
            color="primary"
            aria-label="Clear"
            onClick={() => clearState()}
          >
            <AiOutlineClear className="text-2xl" />
          </Button>
        </Tooltip>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        className="bg-panelBackground text-foreground dark"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                How it works?
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
