import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AwbTracking = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({});
  const [isReadonly, setIsReadonly] = useState(true);

  const onSubmit = async (data) => {
    // Preserve the AWB Tracking ID
    const awbTrackingID = data.awbTrackingID;

    // Reset the form fields, excluding the AWB Tracking ID
    reset({ awbTrackingID });

    try {
      const response = await axios.post(
        "http://localhost:3000/awb-tracking-details",
        {
          AWBID: awbTrackingID, // Use the value from the form
        }
      );

      const responseData = response.data;
      console.log("Response data:", responseData);

      // Clear previous formData if any
      setFormData({});

      // Update formData with the new response data
      setFormData(responseData);

      // Optionally, set `isReadonly` to true if you want the fields to be read-only after fetching data
      setIsReadonly(true);
    } catch (error) {
      // Clear formData and reset other fields on error
      await setFormData({});
      await reset();
      console.error("Error fetching data from server:", error);
      alert("Invalid AWB Tracking ID");
    }
  };

  // Update form fields when formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      Object.keys(formData).forEach((key) => {
        if (key === "DateTimeStamp") {
          setValue("update", formData.update + " " + formData.DateTimeStamp);
        } else {
          setValue(key, formData[key]);
        }
      });
    } else {
      // Clear form fields when formData is empty
      reset({ awbTrackingID: formData.awbTrackingID });
    }
  }, [formData, setValue, reset]);

  return (
    <div className="w-full h-screen mx-auto flex justify-center items-center bg-gray-100">
      <form
        className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex pb-4 mb-5 border-b-2 items-end gap-4 sm:gap-10">
          <div className="flex-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="awb-id"
            >
              AWB Tracking ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="awb-id"
              type="text"
              placeholder="Tracking ID"
              {...register("awbTrackingID", {
                required: "AWB Tracking ID is required",
                minLength: {
                  value: 6,
                  message: "AWB Tracking ID must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "AWB Tracking ID must be at most 20 characters",
                },
              })}
            />
            {errors.awbTrackingID && (
              <p className="text-red-500 text-xs italic">
                {errors.awbTrackingID.message}
              </p>
            )}
          </div>
          <button
            className="bg-blue-500 h-fit w-fit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="consignee-name"
            >
              Consignee Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="consignee-name"
              type="text"
              readOnly={isReadonly}
              placeholder="Consignee Name"
              {...register("consigneeName")}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="consignor-name"
            >
              Consignor Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="consignor-name"
              type="text"
              readOnly={isReadonly}
              placeholder="Consignor Name"
              {...register("consignorName")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="consignee-phone"
            >
              Consignee Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="consignee-phone"
              type="tel"
              readOnly={isReadonly}
              placeholder="Consignee Phone Number"
              {...register("consigneePhoneNumber")}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="consignor-phone"
            >
              Consignor Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="consignor-phone"
              type="tel"
              readOnly={isReadonly}
              placeholder="Consignor Phone Number"
              {...register("consignorPhoneNumber")}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="from"
          >
            From
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="from"
            type="text"
            placeholder="From"
            readOnly={isReadonly}
            {...register("from")}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="to"
          >
            To
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="to"
            type="text"
            placeholder="To"
            readOnly={isReadonly}
            {...register("to")}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="weight"
          >
            Weight
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="weight"
            type="text"
            readOnly={isReadonly}
            placeholder="Weight"
            {...register("weight")}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="update"
          >
            Update Information
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="update"
            type="text"
            placeholder="Update Information"
            readOnly={isReadonly}
            {...register("update")}
          />
        </div>
      </form>
    </div>
  );
};

export default AwbTracking;
