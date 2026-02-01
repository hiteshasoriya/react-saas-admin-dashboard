import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const AddUserForm = ({ isOpen, onClose, onAddUser }) => {
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      plan: 'Basic Plan',
      status: 'active',
      amount: '$99'
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name too short')
        .max(50, 'Name too long')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      onAddUser({
        id: Date.now(), // Temporary ID
        name: values.plan,
        customer: values.name,
        email: values.email,
        date: new Date().toISOString().split('T')[0],
        amount: values.amount,
        status: values.status,
        type: 'subscription',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(values.name)}&background=0ea5e9&color=fff`
      })
      
      toast({
        title: 'User added successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      
      resetForm()
      onClose()
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New User</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.name && formik.errors.name}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  name="name"
                  placeholder="John Doe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <FormLabel color="red.500" fontSize="sm" mt={1}>
                    {formik.errors.name}
                  </FormLabel>
                )}
              </FormControl>

              <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel>Email Address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormLabel color="red.500" fontSize="sm" mt={1}>
                    {formik.errors.email}
                  </FormLabel>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Subscription Plan</FormLabel>
                <Select
                  name="plan"
                  value={formik.values.plan}
                  onChange={formik.handleChange}
                >
                  <option value="Basic Plan">Basic Plan - $99/month</option>
                  <option value="Pro Plan">Pro Plan - $199/month</option>
                  <option value="Premium Plan">Premium Plan - $299/month</option>
                  <option value="Enterprise">Enterprise - Custom</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  placeholder="$99"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              type="submit"
              isLoading={formik.isSubmitting}
            >
              Add User
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddUserForm