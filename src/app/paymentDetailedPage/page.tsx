"use client";

import { useEffect, useState } from "react";

import { detailedPayment } from "~/app/dummyData";
import styles from "~/app/paymentDetailedPage/details.module.css";

export interface detailedPaymentPlan {
  name: string;
  description: string;
  price: number;
  features: string[];
  projectMgt: string[];
  sharing: string[];
  support: string[];
  current_plan_description: string;
  btn: string;
}

export const fetchPaymentPlan = async (): Promise<detailedPaymentPlan[]> => {
  try {
    const response = await fetch("");

    if (!response.ok) {
      return detailedPayment;
    }

    const data: detailedPaymentPlan[] = await response.json();
    return data;
  } catch {
    return detailedPayment;
  }
};
export default function PaymentPlan() {
  const [paymentPlan, setPaymentPlan] = useState<detailedPaymentPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<
    detailedPaymentPlan | undefined
  >();

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await fetchPaymentPlan();
      setPaymentPlan(plans);
      setSelectedPlan(plans[0]);
    };
    fetchPlans();
  }, []);

  return (
    <main className="mx-auto mt-[102px] min-h-svh max-w-[989px]">
      <article className={styles.main}>
        <p className="text[#0A0A0A] pl-[17px] text-[24px] font-[600]">
          Current Plan
        </p>

        <div className="my-[24px] rounded-[12px] bg-[#FFF8F2] pb-[22px] pl-[17px] pr-[94px] pt-[24px]">
          {selectedPlan && (
            <>
              <p className="text-[20px] font-[600] leading-normal text-[#0A0A0A]">
                {selectedPlan.name}
              </p>
              <p className="min-w-[350px] text-[14px] font-[400] md:whitespace-nowrap">
                {selectedPlan.current_plan_description}
              </p>
              <p className="text-[14px] font-[400] text-[#525252]">
                ${selectedPlan.price}/month
              </p>
            </>
          )}
        </div>

        <div className="flex min-h-[222px] w-full gap-4 pl-[17px] sm:mx-auto sm:flex-row">
          <p className="mt-[15px] max-w-[130px] text-[16px] font-[600]">
            Subscribe to your desired plan
          </p>
          <div className={styles.paymentCtn}>
            {paymentPlan.map((plan, index) => (
              <div key={index} className={styles.paymentCards}>
                <p className="text-[16px] font-[600]">{plan.name}</p>
                <p className="py-4 text-[25px] font-[500]">
                  {`$${plan.price}`}{" "}
                  <span className="text-[14px] font-[400] text-[#525252]">
                    /month
                  </span>
                </p>
                <p className="max-w-[160px] text-[14px] font-[400] text-[#525252]">
                  {plan.description}
                </p>
                <button
                  className={styles.paymentBtn}
                  onClick={() => setSelectedPlan(plan)}
                >
                  {plan.btn}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:flex-cols flex w-full sm:flex">
          <p className={styles.highlightTitle}>Highlights</p>
          <div className={styles.highlight}>
            {detailedPayment.map((plan, index) => (
              <div key={index}>
                <ul className={styles.highlightPlans}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="bg-[#FFF8F2] py-[28px] pl-[10px] pr-[39px] text-[16px] font-[700] leading-[19.36px]">
          Project Management
        </p>
        <div className={styles.prodMgt}>
          <div className={styles.prodMgtPlanTitle}>
            <p>Projects</p>
            <p>File Upload</p>
            <p>User Account</p>
            <p>Teams</p>
          </div>
          {detailedPayment.map((plan, index) => (
            <div key={index}>
              <div className={styles.prodMgtPlan}>
                {plan.projectMgt.map((projectMt, projectMtIndex) => (
                  <p key={projectMtIndex}>{projectMt}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="bg-[#FFF8F2] py-[28px] pl-[10px] pr-[39px] text-[16px] font-[700] leading-[19.36px]">
          Sharing and collaboration
        </p>
        <div className={styles.prodMgt}>
          <div className={styles.prodMgtPlanTitle}>
            <p>Integration</p>
            <p>Guest Access</p>
            <p>Page Analysis</p>
            <p>Task Management</p>
          </div>
          {detailedPayment.map((plan, index) => (
            <div key={index}>
              <div className={styles.prodMgtPlan}>
                {plan.projectMgt.map((projectMt, projectMtIndex) => (
                  <div
                    key={projectMtIndex}
                    className="flex justify-center border-b-[0.5px] border-b-[#CBD5E1] py-[26px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#0A0A0A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="bg-[#FFF8F2] py-[28px] pl-[10px] pr-[39px] text-[16px] font-[700] leading-[19.36px]">
          Management and security
        </p>
        <div className={styles.prodMgt}>
          <div className={styles.prodMgtPlanTitle}>
            <p>Team Security</p>
            <p>Data Backup</p>
            <p>HIPAA Compliance</p>
          </div>
          {detailedPayment.map((plan, index) => (
            <div key={index}>
              <div className={styles.prodMgtPlan}>
                {plan.sharing.map((share, shareIndex) => (
                  <div
                    key={shareIndex}
                    className="flex justify-center border-b-[0.5px] border-b-[#CBD5E1] py-[26px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#0A0A0A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="bg-[#FFF8F2] py-[28px] pl-[10px] pr-[39px] text-[16px] font-[700]">
          Support
        </p>
        <div className={styles.prodMgt}>
          <div className={styles.prodMgtPlanTitle}>
            <p>Priority Support</p>
            <p>Customer Support</p>
          </div>
          {detailedPayment.map((plan, index) => (
            <div key={index}>
              <div className={styles.prodMgtPlan}>
                {plan.support.map((sup, supIndex) => (
                  <div
                    key={supIndex}
                    className="flex justify-center border-b-[0.5px] border-b-[#CBD5E1] py-[26px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#0A0A0A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>
    </main>
  );
}
