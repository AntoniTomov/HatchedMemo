import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInput,
} from 'react-native';
import {
  useForm,
  Controller,
  FormProvider,
  FieldValues,
  FieldPath,
  UseFormReturn,
} from 'react-hook-form';

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  style?: ViewStyle;
}

interface FormFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  render: (props: {
    field: {
      onChange: (value: any) => void;
      value: any;
    };
    fieldState: {
      error?: { message?: string };
    };
  }) => React.ReactNode;
}

interface FormItemProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface FormLabelProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface FormControlProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface FormDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface FormMessageProps {
  children?: React.ReactNode;
  style?: TextStyle;
}

const Form = <T extends FieldValues>({ children, form, style }: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <View style={[styles.form, style]}>
        {children}
      </View>
    </FormProvider>
  );
};

const FormField = <T extends FieldValues>({ name, render }: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      render={render}
    />
  );
};

const FormItem = ({ children, style }: FormItemProps) => {
  return (
    <View style={[styles.item, style]}>
      {children}
    </View>
  );
};

const FormLabel = ({ children, style }: FormLabelProps) => {
  return (
    <Text style={[styles.label, style]}>
      {children}
    </Text>
  );
};

const FormControl = ({ children, style }: FormControlProps) => {
  return (
    <View style={[styles.control, style]}>
      {children}
    </View>
  );
};

const FormDescription = ({ children, style }: FormDescriptionProps) => {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  );
};

const FormMessage = ({ children, style }: FormMessageProps) => {
  if (!children) return null;

  return (
    <Text style={[styles.message, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
  item: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  control: {
    width: '100%',
  },
  description: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  message: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
});

Form.Field = FormField;
Form.Item = FormItem;
Form.Label = FormLabel;
Form.Control = FormControl;
Form.Description = FormDescription;
Form.Message = FormMessage;

export { Form }; 