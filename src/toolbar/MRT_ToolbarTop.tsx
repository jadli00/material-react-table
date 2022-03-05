import React, { FC } from 'react';
import { alpha, Box, Toolbar } from '@mui/material';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';
import { useMRT } from '../useMRT';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';

interface Props {}

export const MRT_ToolbarTop: FC<Props> = () => {
  const {
    disableGlobalFilter,
    hideToolbarInternalActions,
    manualPagination,
    muiTableToolbarTopProps,
    positionPagination,
    positionToolbarActions,
    positionToolbarAlertBanner,
    renderToolbarCustomActions,
    tableInstance,
  } = useMRT();

  const toolbarProps =
    muiTableToolbarTopProps instanceof Function
      ? muiTableToolbarTopProps(tableInstance)
      : muiTableToolbarTopProps;

  return (
    <Toolbar
      variant="dense"
      {...toolbarProps}
      sx={(theme) =>
        ({
          backgroundColor: theme.palette.background.default,
          backgroundImage: `linear-gradient(${alpha(
            theme.palette.common.white,
            0.05,
          )},${alpha(theme.palette.common.white, 0.05)})`,
          display: 'grid',
          p: '0 !important',
          position: tableInstance.state.fullScreen ? 'sticky' : undefined,
          top: tableInstance.state.fullScreen ? '0' : undefined,
          width: '100%',
          zIndex: 1,
          ...toolbarProps?.sx,
        } as any)
      }
    >
      {positionToolbarAlertBanner === 'top' && <MRT_ToolbarAlertBanner />}
      <Box
        sx={{
          p: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {renderToolbarCustomActions?.(tableInstance) ?? <span />}
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            position: 'relative',
            zIndex: 3,
          }}
        >
          {!disableGlobalFilter && <MRT_SearchTextField />}
          {!hideToolbarInternalActions && positionToolbarActions === 'top' && (
            <MRT_ToolbarInternalButtons />
          )}
        </Box>
      </Box>
      <div>
        {!manualPagination &&
          ['top', 'both'].includes(positionPagination ?? '') && (
            <MRT_TablePagination />
          )}
      </div>
    </Toolbar>
  );
};