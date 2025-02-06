import React, { useState, useEffect } from "react";
import { OjasTextInput } from "@ojas-ui/text-input";
import WkModal from "@/components/wkModal";
import WkDropdown from "@/components/wkDropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OjasButton } from "@ojas-ui/button";
import { OjasLoader } from "@ojas-ui/loader";
import { useTranslation } from "react-i18next";

interface EditAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedAssessment: any) => Promise<void>;
  assessment: any;
}

const EditAssessment: React.FC<EditAssessmentProps> = ({
  isOpen,
  onClose,
  onSave,
  assessment,
}) => {
  const [updatedAssessment, setUpdatedAssessment] = useState(assessment);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      setUpdatedAssessment(assessment);
    }
  }, [isOpen, assessment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedAssessment((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateAssessmentData = (assessmentData: any) => {
    const requiredFields = [
      "assessmentName",
      "assessmentShortName",
      "assessmentFor",
    ];
    const errors: string[] = [];

    requiredFields.forEach((field) => {
      if (!assessmentData[field]) {
        errors.push(`${field} ${t("is_required")}`);
      }
    });

    return errors.length === 0;
  };

  const handleSave = async () => {
    if (!validateAssessmentData(updatedAssessment)) {
      toast.error(t("please_fill_required_fields"));
      return;
    }

    setLoading(true);
    try {
      await onSave(updatedAssessment);
      toast.success(t("assessment_updated_successfully"));
      onClose();
    } catch (error) {
      toast.error(t("failed_to_update_assessment"));
    } finally {
      setLoading(false);
    }
  };

  const assessmentForOptions = [
    { label: t("fall"), value: "fall" },
    { label: t("oral"), value: "oral" },
    { label: t("bladder"), value: "bladder" },
    { label: t("nutrition"), value: "nutrition" },
    { label: t("bedsore"), value: "bedsore" },
  ];

  return (
    <WkModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("edit_assessment")}
      padding={28}
      width={1100}
      minHeight={500}
    >
      <div className="flex flex-col justify-between h-full space-y-4">
        <div className="flex-grow">
          <div className="flex flex-row space-x-4 w-full mb-8">
            <div className="w-3/4">
              <OjasTextInput
                value={updatedAssessment.assessmentName}
                name="assessmentName"
                onChange={handleChange}
                placeholder={t("assessment_name")}
                label={t("assessment_name")}
                required
              />
            </div>
            <div className="w-1/3">
              <OjasTextInput
                value={updatedAssessment.assessmentShortName}
                name="assessmentShortName"
                onChange={handleChange}
                placeholder={t("short_form")}
                label={t("assessment_short_form")}
                required
              />
            </div>
          </div>
          <div className="flex flex-row space-x-4 w-full">
            <div className="w-1/2">
              <p className="mb-1">{t("assessment_for")}</p>
              <WkDropdown
                options={assessmentForOptions}
                selectedValues={[updatedAssessment.assessmentFor]}
                onChange={(values) =>
                  setUpdatedAssessment((prev: any) => ({
                    ...prev,
                    assessmentFor: values[0],
                  }))
                }
                placeholder={t("assessment_for")}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between space-x-4 button-div mt-auto">
          <OjasButton
            text={t("cancel")}
            fontSize={"18"}
            fontWeight={"500"}
            onClick={onClose}
            backgroundColor="#F9F9F9"
            color="#7E8299"
            borderStyle="none"
          />
          <OjasButton
            text={
              loading ? (
                <div className="flex flex-row">
                  <OjasLoader size={24} color="#FFF" />
                  <div className="ml-2">{t("saving")}</div>
                </div>
              ) : (
                t("save_changes")
              )
            }
            fontSize={"18"}
            fontWeight={"500"}
            onClick={handleSave}
            backgroundColor="#0096C7"
            color="#FFFFFF"
            borderStyle="none"
            disabled={loading}
          />
        </div>
      </div>
    </WkModal>
  );
};

export default EditAssessment;
