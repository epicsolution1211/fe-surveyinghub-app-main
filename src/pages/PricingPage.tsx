import {DetailedHTMLProps, HTMLAttributes, ReactElement} from "react";

 type PricingTableType = 'token'|'subscription'

 const pricingTableId: { [key in PricingTableType]: string|undefined } = {
    token: process.env.REACT_APP_TOKEN_PRICING_TABLE_ID,
    subscription: process.env.REACT_APP_PRICING_TABLE_ID
}

const pricingTableLayout: { [key in PricingTableType]: (child:ReactElement)=>ReactElement } = {
   token: (child: ReactElement) => <div
   className="2xl:min-w-[1280px] md:min-w-[648px] 2xl:h-[384px] md:h-[778px] max-h-[80vh] min-w-content h-[80vh] min-h-[384px] ">{child}</div>,
   subscription: (child: ReactElement) => <div
   className="lg:min-w-[576px] min-w-content h-[1px] min-h-[384px]">{child}</div>
}

function PricingPage(props: {
    clientRefId?: string;
    customerEmail?: string,
    customerSessionSecret?: string,
    table: PricingTableType
}) {
    console.log("render")
    return (pricingTableLayout[props.table](
            <> {(process.env.REACT_APP_PRICING_TABLE_ID && process.env.REACT_APP_PUBLISHABLE_KEY) ?
                <stripe-pricing-table
                    pricing-table-id={pricingTableId[props.table]}
                    publishable-key={process.env.REACT_APP_PUBLISHABLE_KEY}
                    client-reference-id={props.clientRefId}
                    customer-session-client-secret={props.customerSessionSecret}
                    customer-email={props.customerEmail}/> : "NotFound"
            }</>
        )
    );
}

export default PricingPage;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'stripe-pricing-table': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
