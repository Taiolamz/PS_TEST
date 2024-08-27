import { Dictionary } from "@/@types/dictionary";
import CustomSelect from "@/components/custom-select";
import PasswordChecker from "@/components/password-checker";
import TogglePassword from "@/components/toggle-password";
import { Input } from "@/components/ui/input";
import {
  COUNTRIES,
  COUNTRIES_STATES,
  NUMBER_OF_EMPLOYEES,
  STATES,
} from "@/utils/data";
import { passwordValidations, passwordValidation as pv } from "@/utils/schema";
import { useState, useEffect } from "react";

interface OrganizationInformationProps {
  formik: any;
}

const OrganizationInformation = ({ formik }: OrganizationInformationProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountryData, setSelectedCountryData] = useState<Dictionary>(
    {}
  );

  useEffect(() => {
    const countryDataForSelectedCountry = COUNTRIES_STATES?.filter(
      (f) => f.name === formik.values.country
    )?.[0];
    setSelectedCountryData(countryDataForSelectedCountry);
  }, [formik.values.country]);

  return (
    <div style={{ width: "100%" }}>
      <div className="flex flex-col gap-5">
        <Input
          label="Business Name"
          id="organization_name"
          name="organization_name"
          value={formik.values.organization_name}
          onChange={formik.handleChange}
          touched={formik.touched.organization_name}
          error={formik.errors.organization_name}
          onBlur={formik.handleBlur}
          placeholder="Enter Business Name"
        />
        <CustomSelect
          label="Number of Employees"
          placeholder="Number of Employees"
          options={NUMBER_OF_EMPLOYEES}
          selected={formik.values.employees_range}
          setSelected={(selected) => {
            formik.setFieldValue("employees_range", selected);
          }}
          touched={formik.touched.employees_range}
          error={formik.errors.employees_range}
          onBlur={formik.handleBlur}
          canSearch={false}
        />
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <Input
          label="Location"
          id="Address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          touched={formik.touched.address}
          error={formik.errors.address}
          onBlur={formik.handleBlur}
          placeholder="Enter Address"
        />
        <Input
          id="City"
          name="city"
          type={`text`}
          value={formik.values.city}
          onChange={formik.handleChange}
          touched={formik.touched.city}
          error={formik.errors.city}
          onBlur={formik.handleBlur}
          placeholder="Enter City"
          autoComplete={`off`}
        />
        <div className="grid grid-cols-2 gap-4">
          <CustomSelect
            options={COUNTRIES_STATES?.map((item: Dictionary) => {
              return {
                label: item.name,
                value: item.name,
              };
            })}
            selected={formik.values.country}
            setSelected={(selected) => {
              formik.setFieldValue("country", selected);
              const COUNTRY_DATA = COUNTRIES_STATES?.filter(
                (f) => f.name === selected
              )?.[0];
              formik.setFieldValue("state", "");
              setSelectedCountryData(COUNTRY_DATA);
            }}
            touched={formik.touched.country}
            error={formik.errors.country}
            placeholder="Select Country"
          />
          <CustomSelect
            options={selectedCountryData?.stateProvinces?.map(
              (item: Dictionary) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              }
            )}
            selected={formik.values.state}
            setSelected={(selected) => formik.setFieldValue("state", selected)}
            touched={formik.touched.state}
            error={formik.errors.state}
            placeholder="Select State"
          />
        </div>
      </div>
      <div>
        <div className="mt-9 relative mb-5">
          <Input
            label="Password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.password}
            error={formik.errors.password}
            placeholder="Input Password"
            type={showPassword ? "text" : "password"}
          />
          <TogglePassword
            showPassword={showPassword}
            setShowPassword={() => setShowPassword(!showPassword)}
            className="top-8"
          />
        </div>
        <div className=" relative">
          <Input
            label="Confirm Password"
            id="password_confirmation"
            name="password_confirmation"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.password_confirmation}
            error={formik.errors.password_confirmation}
            placeholder="Input Password"
            type={showPassword ? "text" : "password"}
          />
          <TogglePassword
            showPassword={showPassword}
            setShowPassword={() => setShowPassword(!showPassword)}
            className="top-8"
          />
        </div>
        <div className="mt-6 flex flex-col gap-2">
          {passwordValidations.map((validation, idx) => (
            <PasswordChecker
              key={idx}
              isValid={pv(formik.values.password, validation)}
              title={validation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationInformation;
