import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Icon,
  Box,
  VStack,
} from '@chakra-ui/react'
import { FiAlertTriangle, FiTrash2, FiInfo } from 'react-icons/fi'

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "delete", // 'delete', 'warning', 'info'
  isLoading = false,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'delete':
        return FiTrash2
      case 'warning':
        return FiAlertTriangle
      case 'info':
        return FiInfo
      default:
        return FiInfo
    }
  }

  const getIconColor = () => {
    switch (type) {
      case 'delete':
        return 'red.500'
      case 'warning':
        return 'orange.500'
      case 'info':
        return 'blue.500'
      default:
        return 'blue.500'
    }
  }

  const getConfirmButtonColor = () => {
    switch (type) {
      case 'delete':
        return 'red'
      case 'warning':
        return 'orange'
      case 'info':
        return 'blue'
      default:
        return 'brand'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px" borderColor="gray.200">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={4} align="center">
            <Box
              w={12}
              h={12}
              borderRadius="full"
              bg={`${getIconColor()}15`}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={getIcon()} w={6} h={6} color={getIconColor()} />
            </Box>
            <Text textAlign="center" fontSize="md" color="gray.600">
              {message}
            </Text>
            {type === 'delete' && (
              <Box
                p={3}
                borderRadius="lg"
                bg="red.50"
                border="1px"
                borderColor="red.200"
                w="full"
              >
                <Text fontSize="sm" color="red.600" textAlign="center">
                  This action cannot be undone. The data will be permanently deleted.
                </Text>
              </Box>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={onClose}
            isDisabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            colorScheme={getConfirmButtonColor()}
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText="Processing..."
            leftIcon={type === 'delete' ? <FiTrash2 /> : null}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationModal