// Frequently asked questions shown on practice-area pages and emitted as
// FAQPage structured data. General California legal information only —
// have a licensed attorney review before publishing changes.

export interface PracticeFaq {
  q: string;
  a: string;
}

export const practiceFaqs: Record<string, PracticeFaq[]> = {
  'personal-injury': [
    {
      q: 'How long do I have to file a personal injury lawsuit in California?',
      a: 'Most California personal injury claims must be filed within two years of the injury under Code of Civil Procedure § 335.1. If a government agency or public employee was involved, a written government claim generally must be presented within six months (Government Code § 911.2) before a lawsuit can be filed.'
    },
    {
      q: 'Can I still recover compensation if I was partly at fault?',
      a: 'Yes. California follows pure comparative fault, so your compensation is reduced by your percentage of fault but not eliminated. For example, if you were 20% at fault, you can still recover 80% of your damages.'
    },
    {
      q: 'What damages can I recover after an injury in California?',
      a: 'Injured people may seek economic damages such as medical bills, future care and lost earnings, and non-economic damages such as pain, suffering and emotional distress. Punitive damages are available only in limited cases involving malice, oppression or fraud.'
    },
    {
      q: 'How much does it cost to hire a personal injury lawyer?',
      a: 'Personal injury cases are commonly handled on a contingency fee basis, meaning attorney fees are paid as a percentage of any recovery. Fee terms must be set out in a written agreement under California Business and Professions Code § 6147.'
    }
  ],
  'car-accidents': [
    {
      q: 'How long do I have to file a car accident claim in California?',
      a: 'You generally have two years from the date of the crash to file a lawsuit for bodily injury (CCP § 335.1) and three years for property damage (CCP § 338). If a public vehicle or government road defect was involved, a government claim must usually be presented within six months.'
    },
    {
      q: 'Can I recover damages if I was partly at fault for the crash?',
      a: 'Yes. Under California’s pure comparative fault rule, your recovery is reduced by your share of fault. Even a driver found mostly at fault can recover a reduced amount from the other driver.'
    },
    {
      q: 'Can an uninsured driver recover pain and suffering in California?',
      a: 'Under Proposition 213 (Civil Code § 3333.4), an uninsured driver injured in a crash generally cannot recover non-economic damages such as pain and suffering, although medical bills and lost wages may still be recoverable. Exceptions apply, including when the other driver was convicted of DUI.'
    },
    {
      q: 'Should I talk to the other driver’s insurance company?',
      a: 'You must report the accident to your own insurer, but you are not required to give a recorded statement to the other driver’s insurer. Statements can be used to dispute fault or injuries, so many people speak with a lawyer first.'
    },
    {
      q: 'Do I need to report a car accident to the DMV?',
      a: 'California requires drivers to file an SR-1 report with the DMV within 10 days if anyone was injured or killed, or if property damage exceeded $1,000, regardless of whether police responded.'
    }
  ],
  'wrongful-termination': [
    {
      q: 'Can I be fired for any reason in California?',
      a: 'California is an at-will employment state, but an employer cannot fire you for an illegal reason, such as discrimination, retaliation for reporting wrongdoing, taking protected leave, or refusing to break the law.'
    },
    {
      q: 'How long do I have to file a wrongful termination claim?',
      a: 'For discrimination or retaliation under FEHA, you generally have three years to file a complaint with the California Civil Rights Department. Common-law wrongful termination in violation of public policy claims generally must be filed within two years.'
    },
    {
      q: 'Should I sign a severance agreement?',
      a: 'A severance agreement usually requires you to release legal claims against your employer. California law gives employees the right to consult an attorney before signing a separation agreement that includes certain non-disparagement terms, so it is wise to have it reviewed first.'
    },
    {
      q: 'What can I recover for wrongful termination?',
      a: 'Possible remedies include lost wages and benefits, future lost earnings, emotional distress damages and, in cases involving malice, oppression or fraud, punitive damages. FEHA claims may also allow recovery of attorney fees.'
    }
  ],
  'employment-law': [
    {
      q: 'What workplace protections does California law provide?',
      a: 'California employees are protected by the Fair Employment and Housing Act (FEHA) against discrimination, harassment and retaliation, and by the Labor Code for minimum wage, overtime, meal and rest breaks, final pay and expense reimbursement.'
    },
    {
      q: 'How do I know if I am misclassified as an independent contractor?',
      a: 'California uses the ABC test from AB 5 for most wage claims. You are presumed to be an employee unless the company shows you are free from its control, your work is outside its usual business, and you run an independently established business.'
    },
    {
      q: 'How long do I have to bring a California employment claim?',
      a: 'Deadlines vary by claim: generally three years to file a FEHA complaint with the Civil Rights Department, three years for most Labor Code wage claims, and up to four years for unpaid wages pursued under the Unfair Competition Law.'
    },
    {
      q: 'Can my employer retaliate against me for complaining?',
      a: 'No. California Labor Code § 1102.5 and FEHA prohibit retaliation against employees who report illegal conduct, complain about discrimination or unpaid wages, or take part in an investigation.'
    }
  ],
  'wage-and-hour': [
    {
      q: 'When is overtime required in California?',
      a: 'Non-exempt employees generally earn 1.5 times their regular rate for hours over 8 in a workday or 40 in a workweek, and for the first 8 hours on the seventh consecutive workday. Double time applies after 12 hours in a day and after 8 hours on the seventh consecutive day.'
    },
    {
      q: 'What happens if my employer skips my meal or rest breaks?',
      a: 'Employers owe one additional hour of pay at the regular rate for each workday a compliant meal period is not provided, and another hour for each workday a compliant rest period is not provided (Labor Code § 226.7).'
    },
    {
      q: 'How far back can I recover unpaid wages?',
      a: 'Most Labor Code wage claims have a three-year limitations period. When unpaid wages are also pursued under the Unfair Competition Law (Business and Professions Code § 17200), the period can extend to four years.'
    },
    {
      q: 'What if my final paycheck was late?',
      a: 'If an employer willfully fails to pay all final wages on time, it may owe waiting time penalties equal to one day’s wages for each day of delay, up to 30 days (Labor Code § 203).'
    }
  ],
  'disability-rights': [
    {
      q: 'What is the Unruh Civil Rights Act?',
      a: 'The Unruh Civil Rights Act (Civil Code § 51) requires California businesses to provide full and equal access to people with disabilities. A violation of the federal ADA is also a violation of Unruh, and Civil Code § 52 provides for statutory damages of at least $4,000 per violation.'
    },
    {
      q: 'What is a reasonable accommodation at work?',
      a: 'Under FEHA, employers with five or more employees must provide reasonable accommodations for an employee’s known disability, such as modified schedules, equipment or leave, and must engage in a timely, good-faith interactive process with the employee.'
    },
    {
      q: 'What can I do if a business or website is not accessible?',
      a: 'People who encounter barriers at public accommodations may have claims under ADA Title III and the Unruh Act. Documenting the date, location and barrier with photos helps an attorney evaluate the claim.'
    },
    {
      q: 'How long do I have to file a disability discrimination claim?',
      a: 'Employment disability discrimination complaints under FEHA generally must be filed with the Civil Rights Department within three years. Deadlines for public accommodation claims vary, so it is best to act promptly.'
    }
  ],
  'medical-malpractice': [
    {
      q: 'How long do I have to file a medical malpractice claim in California?',
      a: 'Under Code of Civil Procedure § 340.5, a claim must generally be filed within one year after you discovered, or reasonably should have discovered, the injury, and no more than three years after the injury, with limited exceptions. A 90-day notice of intent to sue is also required before filing.'
    },
    {
      q: 'Is there a cap on medical malpractice damages in California?',
      a: 'Yes. Since AB 35 took effect in 2023, California caps non-economic damages in medical malpractice cases at amounts that started at $350,000 for non-death cases and $500,000 for wrongful death cases, increasing each year. Economic damages such as medical costs and lost earnings are not capped.'
    },
    {
      q: 'How do I know if I have a medical malpractice case?',
      a: 'A claim generally requires showing that a provider fell below the accepted standard of care and that this caused harm. Medical expert review is usually needed to evaluate whether a bad outcome was caused by negligence.'
    }
  ],
  'consumer-protection': [
    {
      q: 'What laws protect California consumers?',
      a: 'Key laws include the Consumers Legal Remedies Act (Civil Code § 1750), the Unfair Competition Law (Business and Professions Code § 17200), the False Advertising Law, and the Song-Beverly Consumer Warranty Act for defective vehicles and goods.'
    },
    {
      q: 'What should I keep if I think a company deceived me?',
      a: 'Keep receipts, contracts, advertisements, screenshots, emails, chat logs and bank or card statements. These records help show what was promised and what you actually received.'
    },
    {
      q: 'How long do I have to bring a consumer claim?',
      a: 'Deadlines depend on the claim: generally three years under the Consumers Legal Remedies Act and four years under the Unfair Competition Law. Acting early helps preserve evidence.'
    }
  ]
};
