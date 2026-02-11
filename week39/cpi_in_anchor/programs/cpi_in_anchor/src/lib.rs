use anchor_lang::{accounts::signer, prelude::*};


declare_id!("FpY474UsyrxjtLrsuSmM34DpqsnXBmc5C1srwWwDnw5u");

#[program]
pub mod cpi_in_anchor {
    use anchor_lang::system_program::{Transfer, transfer};

    use super::*;

    pub fn sol_transfer(ctx:Context<SOlTransfer>, amount: u64) -> Result<()> {
        let from_pubkey = ctx.accounts.sender.to_account_info();
        let to_pubkey = ctx.accounts.recepient.to_account_info();
        let program_id = ctx.accounts.system_program.to_account_info();

        let cpi_context = CpiContext::new(
            program_id,
            Transfer {
                from: from_pubkey,
                to: to_pubkey,
            },
        );
        
        transfer(cpi_context, amount)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SOlTransfer<'info> {
    #[account(mut)]
    sender: Signer<'info>,
    #[account(mut)]
    recepient: SystemAccount<'info>,
    system_program: Program<'info, System>,
}
