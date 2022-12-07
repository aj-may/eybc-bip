import React, { MouseEventHandler, useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

type AlertDialogProperties = {
  isOpen: boolean;
  onClose: () => void;
  dialogRef: React.MutableRefObject<HTMLElement>;
  onAccept: MouseEventHandler<HTMLButtonElement>;
  header: String;
  content: String;
};

const CustomAlertDialog = ({
  isOpen,
  onClose,
  dialogRef,
  onAccept,
  header,
  content,
}: AlertDialogProperties) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      blockScrollOnMount={true}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>{content}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={onAccept} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
