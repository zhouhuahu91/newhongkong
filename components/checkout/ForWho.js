// Hook imports
import useI18n from "@/hooks/useI18n";
// Component imports
import Input from "@/components/Input";

const ForWho = ({ register, errors }) => {
  // t to translate text.
  const t = useI18n();
  return (
    <>
      {/* The title of this component. */}
      <h2 className="text-lg font-normal mt-4 mb-2">{t.for_who}</h2>
      {/* The main container */}
      <div className="grid grid-cols-2 gap-2">
        {/* The container for the name input. */}
        <Input
          register={register}
          errors={errors.name}
          name="name"
          type="text"
          label={t.name}
          wrapper="col-span-2 sm:col-span-1"
        />
        {/* The container for the telephone input. */}
        <Input
          register={register}
          errors={errors.tel}
          name="tel"
          label={t.phone_number}
          wrapper="col-span-2 sm:col-span-1"
        />
        {/* The container for the email input. */}
        <Input
          register={register}
          errors={errors.email}
          name="email"
          label={t.email}
          wrapper="col-span-2"
        />
      </div>
    </>
  );
};

export default ForWho;
