import styles from './ContactForm.module.css';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import type { JSX } from 'react';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name muss mindestens 2 Zeichen lang sein')
    .required('Name ist erforderlich'),
  email: Yup.string()
    .email('Ungültige E-Mail-Adresse')
    .required('E-Mail ist erforderlich'),
  message: Yup.string()
    .min(10, 'Nachricht muss mindestens 10 Zeichen lang sein')
    .required('Nachricht ist erforderlich'),
});

function ContactForm(): JSX.Element {
  const initialValues: FormValues = {
    name: '',
    email: '',
    message: '',
  };

  const handleSubmit = (values: FormValues) => {
    console.log('Formulardaten:', values);
    alert(`Nachricht gesendet! Danke, ${values.name}`);
  };

  return (
    <div className={styles.meinContainer}>
      <div className={styles.formConteiner}>
        <h2 className={styles.formTitle}>Kontaktieren Sie uns</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name:</label>
              <Field
                id="name"
                name="name"
                placeholder="Geben Sie Ihren Namen ein"
                className={styles.input}
              />
              <ErrorMessage name="name" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">E-Mail:</label>
              <Field
                id="email"
                name="email"
                placeholder="Geben Sie Ihre E-Mail ein"
                className={styles.input}
              />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Nachricht:</label>
              <Field
                as="textarea"
                id="message"
                name="message"
                placeholder="Geben Sie Ihre Nachricht ein"
                className={styles.input}
              />
              <ErrorMessage name="message" component="div" className={styles.error} />
            </div>

            <button type="submit" className={styles.submitButton}>
              Senden
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ContactForm;

      