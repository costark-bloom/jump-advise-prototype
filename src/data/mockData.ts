import type { Client, MeetingNote, Task } from '../types'

export const advisor = {
  name: 'Sarah Chen, CFP®',
  firm: 'Northstar Wealth Partners',
}

export const client: Client = {
  id: 'client-1',
  name: 'Michael & Jennifer Park',
  email: 'm.park@email.com',
  netWorth: '$840,000',
  invited: false,
  activated: false,
}

export const meeting: MeetingNote = {
  id: 'meeting-1',
  clientName: 'Michael & Jennifer Park',
  date: 'June 4, 2026',
  duration: '52 min',
  summary:
    'Reviewed retirement readiness and tax optimization opportunities. Michael expressed concern about tax burden in retirement. Discussed Roth conversion strategy given current income bracket. Jennifer wants to update beneficiaries on existing accounts. Both interested in increasing 401(k) contributions before year-end.',
  keyTopics: [
    'Roth IRA conversion ($100K from Traditional IRA)',
    'Beneficiary updates on Fidelity 401(k)',
    'Increase 401(k) contributions to employer match max',
    'Estate planning attorney referral',
  ],
  transcript: `Advisor: Based on your current tax bracket and projected retirement income, a partial Roth conversion this year could save you roughly $20,000 over the next five years.

Michael: That sounds significant. Where is our Traditional IRA held again?

Advisor: Per our records, your Traditional IRA is at Robinhood — about $285,000. We'd recommend converting $100,000 this year while you're still in the 24% bracket.

Jennifer: What about our 401(k)? I don't think we've updated beneficiaries since our youngest was born.

Advisor: Good catch. Your Fidelity 401(k) still lists your previous estate plan. I'd recommend updating beneficiaries this week.

Michael: Can we also bump up our 401(k) contributions? I think we're leaving match money on the table.

Advisor: You're currently at 4%. Your employer matches up to 6%. Increasing to 6% would add roughly $4,800/year in free money.`,
}

export const suggestedTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Convert $100,000 from Traditional IRA to Roth IRA',
    description:
      'Partial Roth conversion while in the 24% tax bracket to reduce future RMD tax burden.',
    category: 'Tax Optimization',
    dueDate: 'November 23, 2026',
    expectedOutcome: '~$20,000 increase to wealth portfolio over the next 5 years',
    institution: 'Robinhood',
    status: 'pending',
    priority: 'high',
    aiSuggested: true,
    approved: false,
    steps: [
      {
        id: 's1',
        title: 'Review conversion amount & tax impact',
        description:
          'Confirm converting $100,000 keeps you within the 24% federal bracket. Your estimated federal tax on this conversion is ~$24,000, payable at tax filing.',
        tip: 'You can spread conversions across multiple years if needed to stay in a lower bracket.',
      },
      {
        id: 's2',
        title: 'Log into Robinhood',
        description:
          'Open Robinhood and navigate to your Traditional IRA account. You\'ll find conversion options under Account Settings → Transfers.',
        tip: 'Have your Robinhood login ready. Two-factor authentication may be required.',
      },
      {
        id: 's3',
        title: 'Initiate Roth conversion',
        description:
          'Select "Convert to Roth IRA" and enter $100,000. Robinhood will move funds in-kind — no need to sell positions first.',
        tip: 'Avoid converting if you have unrealized losses you plan to harvest this year.',
      },
      {
        id: 's4',
        title: 'Confirm & document',
        description:
          'Save your confirmation number and upload it here. Jump will track this for your advisor and include it in your year-end tax summary.',
      },
    ],
  },
  {
    id: 'task-2',
    title: 'Update beneficiaries on Fidelity 401(k)',
    description:
      'Ensure beneficiary designations reflect current family structure, including youngest child.',
    category: 'Estate Planning',
    dueDate: 'June 30, 2026',
    expectedOutcome: 'Protects $312,000 in retirement assets for intended heirs',
    institution: 'Fidelity',
    status: 'pending',
    priority: 'high',
    aiSuggested: true,
    approved: false,
    steps: [
      {
        id: 's1',
        title: 'Gather beneficiary information',
        description:
          'You\'ll need full legal names, dates of birth, and SSNs (or ITINs) for each beneficiary.',
      },
      {
        id: 's2',
        title: 'Access Fidelity NetBenefits',
        description:
          'Log in at netbenefits.fidelity.com with your employer plan credentials.',
      },
      {
        id: 's3',
        title: 'Update primary & contingent beneficiaries',
        description:
          'Navigate to Profile → Beneficiaries. Set Jennifer as primary (100%), with children as contingent split equally.',
      },
      {
        id: 's4',
        title: 'Save confirmation',
        description:
          'Download the confirmation PDF and mark this task complete.',
      },
    ],
  },
  {
    id: 'task-3',
    title: 'Increase 401(k) contribution to 6%',
    description:
      'Capture full employer match by increasing deferral from 4% to 6% of salary.',
    category: 'Retirement',
    dueDate: 'July 15, 2026',
    expectedOutcome: '~$4,800/year in additional employer match + tax-deferred growth',
    institution: 'Fidelity',
    status: 'pending',
    priority: 'medium',
    aiSuggested: true,
    approved: false,
    steps: [
      {
        id: 's1',
        title: 'Review current contribution',
        description:
          'You\'re at 4% ($3,200/year). Employer matches 50% up to 6% — you\'re leaving $1,600/year on the table.',
      },
      {
        id: 's2',
        title: 'Update deferral election',
        description:
          'In Fidelity NetBenefits, go to Contributions → Change Contribution Rate. Set to 6%.',
        tip: 'Changes typically take 1-2 pay periods to take effect.',
      },
      {
        id: 's3',
        title: 'Confirm new rate',
        description:
          'Verify the updated rate on your next pay stub and mark complete.',
      },
    ],
  },
  {
    id: 'task-4',
    title: 'Schedule consultation with estate planning attorney',
    description:
      'Review trust structure and ensure alignment with updated beneficiary designations.',
    category: 'Estate Planning',
    dueDate: 'August 15, 2026',
    expectedOutcome: 'Comprehensive estate plan aligned with current assets & family',
    status: 'pending',
    priority: 'medium',
    aiSuggested: true,
    approved: false,
    steps: [
      {
        id: 's1',
        title: 'Review attorney referral',
        description:
          'Your advisor recommends Morrison & Associates (estate planning). Contact: (555) 234-8901.',
      },
      {
        id: 's2',
        title: 'Schedule initial consultation',
        description:
          'Book a 60-minute consultation. Bring your current will, trust documents, and beneficiary confirmations.',
      },
      {
        id: 's3',
        title: 'Complete consultation',
        description:
          'Attend the meeting and note any follow-up actions your attorney recommends.',
      },
    ],
  },
]
