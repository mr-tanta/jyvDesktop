'use client';

import React, { useState } from 'react';
import { useCaseCategories, useCasesData } from '@/data/useCasesData';
import UseCaseCategory from './UseCaseCategory';
import UseCaseSelector from './UseCaseSelector';
import UseCaseDetail from './UseCaseDetail';

export function ClientSideUseCases() {
    const [activeCategory, setActiveCategory] = useState(useCaseCategories[0].id);
    const [activeUseCaseIndex, setActiveUseCaseIndex] = useState(0);

    const currentUseCases = useCasesData[activeCategory];
    const currentUseCase = currentUseCases[activeUseCaseIndex];

    return (
        <div className="bg-black text-white pt-4 pb-8 rounded-xl overflow-hidden border border-gray-800 shadow-xl">
            <UseCaseCategory
                categories={useCaseCategories}
                activeCategory={activeCategory}
                setActiveCategory={(category) => {
                    setActiveCategory(category);
                    setActiveUseCaseIndex(0);
                }}
            />

            <UseCaseSelector
                useCases={currentUseCases}
                activeUseCaseIndex={activeUseCaseIndex}
                setActiveUseCaseIndex={setActiveUseCaseIndex}
            />

            <UseCaseDetail
                useCase={currentUseCase}
            />
        </div>
    );
}